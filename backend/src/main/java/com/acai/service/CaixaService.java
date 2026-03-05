package com.acai.service;

import com.acai.dto.AbrirCaixaRequest;
import com.acai.dto.CaixaResponse;
import com.acai.dto.MovimentoRequest;
import com.acai.entity.Caixa;
import com.acai.entity.MovimentoCaixa;
import com.acai.entity.Usuario;
import com.acai.enums.CashMovementType;
import com.acai.enums.CashRegisterStatus;
import com.acai.repository.CaixaRepository;
import com.acai.repository.MovimentoCaixaRepository;
import com.acai.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaixaService {

    private final CaixaRepository caixaRepository;
    private final MovimentoCaixaRepository movimentoRepository;
    private final UsuarioRepository usuarioRepository;

    public CaixaResponse getCaixaAberto() {
        Caixa caixa = caixaRepository.findFirstByStatusOrderByAberturaDesc(CashRegisterStatus.ABERTO)
                .orElseThrow(() -> new RuntimeException("Nenhum caixa aberto"));
        return toResponse(caixa);
    }

    @Transactional
    public CaixaResponse abrirCaixa(UUID usuarioId, AbrirCaixaRequest request) {
        if (caixaRepository.existsByUsuarioIdAndStatus(usuarioId, CashRegisterStatus.ABERTO)) {
            throw new RuntimeException("Já existe um caixa aberto para este usuário");
        }

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Caixa caixa = Caixa.builder()
                .usuario(usuario)
                .saldoInicial(request.getValorInicial())
                .build();

        caixa = caixaRepository.save(caixa);

        MovimentoCaixa abertura = MovimentoCaixa.builder()
                .caixa(caixa)
                .tipo(CashMovementType.ENTRADA)
                .valor(request.getValorInicial())
                .descricao("Abertura de caixa")
                .build();

        movimentoRepository.save(abertura);

        return toResponse(caixaRepository.findById(caixa.getId()).orElse(caixa));
    }

    @Transactional
    public CaixaResponse fecharCaixa(UUID caixaId) {
        Caixa caixa = caixaRepository.findById(caixaId)
                .orElseThrow(() -> new RuntimeException("Caixa não encontrado"));

        if (caixa.getStatus() != CashRegisterStatus.ABERTO) {
            throw new RuntimeException("Caixa já está fechado");
        }

        BigDecimal entradas = movimentoRepository.sumEntradasByCaixaId(caixaId);
        BigDecimal saidas = movimentoRepository.sumSaidasByCaixaId(caixaId);
        BigDecimal saldoFinal = entradas.subtract(saidas);

        caixa.setStatus(CashRegisterStatus.FECHADO);
        caixa.setSaldoFinal(saldoFinal);
        caixa.setFechamento(LocalDateTime.now());

        return toResponse(caixaRepository.save(caixa));
    }

    @Transactional
    public CaixaResponse registrarMovimento(UUID caixaId, MovimentoRequest request) {
        Caixa caixa = caixaRepository.findById(caixaId)
                .orElseThrow(() -> new RuntimeException("Caixa não encontrado"));

        if (caixa.getStatus() != CashRegisterStatus.ABERTO) {
            throw new RuntimeException("Caixa não está aberto");
        }

        MovimentoCaixa movimento = MovimentoCaixa.builder()
                .caixa(caixa)
                .tipo(request.getTipo())
                .valor(request.getValor())
                .formaPagamento(request.getFormaPagamento())
                .descricao(request.getDescricao())
                .build();

        movimentoRepository.save(movimento);

        return toResponse(caixaRepository.findById(caixaId).orElse(caixa));
    }

    public CaixaResponse buscarPorId(UUID id) {
        Caixa caixa = caixaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Caixa não encontrado"));
        return toResponse(caixa);
    }

    private CaixaResponse toResponse(Caixa caixa) {
        BigDecimal entradas = movimentoRepository.sumEntradasByCaixaId(caixa.getId());
        BigDecimal saidas = movimentoRepository.sumSaidasByCaixaId(caixa.getId());

        List<CaixaResponse.MovimentoResponse> movimentos = caixa.getMovimentos() != null
                ? caixa.getMovimentos().stream().map(m -> CaixaResponse.MovimentoResponse.builder()
                        .id(m.getId())
                        .tipo(m.getTipo())
                        .valor(m.getValor())
                        .formaPagamento(m.getFormaPagamento())
                        .descricao(m.getDescricao())
                        .criadoEm(m.getCriadoEm())
                        .build())
                        .collect(Collectors.toList())
                : Collections.emptyList();

        return CaixaResponse.builder()
                .id(caixa.getId())
                .usuarioNome(caixa.getUsuario().getNome())
                .status(caixa.getStatus())
                .saldoInicial(caixa.getSaldoInicial())
                .saldoFinal(caixa.getSaldoFinal())
                .totalEntradas(entradas)
                .totalSaidas(saidas)
                .saldoAtual(entradas.subtract(saidas))
                .abertura(caixa.getAbertura())
                .fechamento(caixa.getFechamento())
                .movimentos(movimentos)
                .build();
    }
}
