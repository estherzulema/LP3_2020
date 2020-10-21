import { getManager } from 'typeorm';
import { Lancamento } from "../entity/Lancamento";

export class LancamentoController {

    async salvar(lancamento: Lancamento) {
        const lancamentoSalvo = await getManager().save(lancamento);
        return lancamentoSalvo;
    }
    
/**alterar */

async alterarLancamento(id: number, lancamento:Lancamento){
    const OutroLancamento = await getManager().findOne(Lancamento, id);
    if(OutroLancamento) {
        await getManager().save(lancamento);
        return true;
    }
    return false;
}
/**deletar */

async deletarLancamento(id: number){
    const lancamento = await getManager().findOne(Lancamento, id);
    if(lancamento) {
        await getManager().delete(Lancamento,id);
        return lancamento;
    }
    return false;
}

}
