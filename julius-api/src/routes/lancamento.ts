import { UsuarioController } from './../controller/UsuarioController';
import { LancamentoController } from './../controller/LancamentoController';
import { Router } from 'express';
import { Lancamento } from '../entity/Lancamento';

export const routerLancamento = Router();
const lancamentoCtrl = new LancamentoController();
const usuarioCtrl = new UsuarioController();

/**
 * Serviço para salvar um novo lançamento
 */

routerLancamento.post('/', async (req, res) => {
    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
    if (usuario) {
        const lancamento = new Lancamento(valor, descricao, data, usuario);
        const lancamentoSalvo = await lancamentoCtrl.salvar(lancamento);
        res.json(lancamentoSalvo);
    } else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
    }
});



/**alterar */

routerLancamento.put('/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.id);

    const { idUsuario, valor, descricao, data } = req.body;
    const usuario = await usuarioCtrl.recuperarPorId(idUsuario);
       
    const lancamento = new Lancamento(valor, descricao, data, usuario);
    lancamento.id = idLancamento
    await lancamentoCtrl.alterarLancamento(idLancamento,lancamento);
 
       if (lancamento) {   
        res.status(200).json({ mensagem: 'Lançamento alterado' });
    } 
          else {
        res.status(404).json({ mensagem: 'Usuário do lançamento não encontrado' });
         }

});


/**deletar */

routerLancamento.delete('/:id', async (req, res) => {
    const idLancamento = parseInt(req.params.id);
    const lancamento = await lancamentoCtrl.deletarLancamento(idLancamento);
    
    if(lancamento){
        res.status(404).json({ mensagem: 'Lancamento deletado' });
    
    }else{
        res.status(404).json({ mensagem: 'Lançamento não encontrado' });
    }
});