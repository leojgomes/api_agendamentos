const express = require('express');
const app = express();
const pool = require ('./database/db');

app.use(express.json());

app.get('/especialidades', async(_,res) =>{
try{
    const especialidade = await pool.query('SELECT * FROM tb_especialidades');
    res.status(200).json (especialidade.rows);
   }catch(err) {
    console.error('Erro ao buscar especialidade', err);
   }
});



//Rota para criar uma nova especialidade

app.post('/especialidades', async (req, res) => {
    //dados que o cliente enviou para criar uma nova especialidade
    const { nome_especialidade} = req.body;
    try {
        const especialidades = await pool.query(
    //insere os valores recebidos na tabela e retorna todos os campos da nova tarefa
    //($1) são placeholders usados para passar valores para a query de forma segura, evitando a injeção de SQL.
    'INSERT INTO tb_especialidades (nome_especialidade) VALUES ($1) RETURNING *',
    // o array contém os valores que serao passados como parametros para a query e são colocadosnas posições correspondentes em VALUES
    [ nome_especialidade]
    );
    res.status(201).json(especialidades.rows[0]); //Retorna a nova especialidade criada
    }catch (err){
        console.error('Erro ao criar uma especialidade:', err);
        res.status(500).json({error: 'Erro ao criar uma especialidade' });
    }
});




//Rota para atualizar uma especialidade

app.put('/especialidades/:id', async (req, res) => {
    const { id } = req.params; // pega o id da tarefa da URL
    const { nome_especialidade} = req.body; //pega os dados atualizados do corpo da requisição

    try {
        const especialidades = await pool.query(
        'UPDATE tb_especialidades SET nome_especialidade = $1 WHERE id = $2 RETURNING *',
        [nome_especialidade, id]
    );

    if (especialidades.rowCount === 0 ) { //significa que não há nenhuma especialidade com o ID fornecido.
        return res.status(404).json({error: 'Especialidade não encontrado'}); //Caso a especialidade não seja encontrada
        }
    res.status(200).json(especialidades.rows[0]); //Retorna a especialidade atualizado
    }catch (err){
        console.error('Erro ao atualizar a especialidade:', err);
        res.status(500).json({error: 'Erro ao atualizar a especialidade' });
    }
});



//Rota para deletar uma especialidade

app.delete('/especialidades/:id', async (req, res) => {
    const { id } = req.params; // pega a id da especialidade da URL


    try {
        const especialidades = await pool.query('DELETE FROM tb_especialidades WHERE id = $1 RETURNING *', [id]);
        if (especialidades.rowCount === 0) { // significa que não há nenhuma especialidade com o ID fornecido.
            return res.status(404). json({error: 'especialidade não encontrada' }); // Caso a especialidade não seja encontrado
        }


        res.status(200).json({ message: 'Especialidade excluida com sucesso' }); // Retorna a mensagem de sucesso
    } catch (err) {
        console.error('Erro ao excluir especialidade:', err);
        res.status(500).json({ error: 'Erro ao excluir a especialidade' });
    }
});




app.get('/tipo_pagamentos', async(_,res) =>{
try{
    const pagamento = await pool.query('SELECT * FROM tb_tipos_pagamentos');
    res.status(200).json (pagamento.rows);
   }catch(err) {
    console.error('Erro ao buscar pagamentos', err);
   }
});



//Rota para criar um novo tipo pagamento

app.post('/tipo_pagamentos', async (req, res) => {
    //dados que o cliente enviou para criar um novo tipo de pagamento
    const { tipo} = req.body;
    try {
        const pagamento = await pool.query(
    //insere os valores recebidos na tabela e retorna todos os campos da nova tarefa
    //($1) são placeholders usados para passar valores para a query de forma segura, evitando a injeção de SQL.
    'INSERT INTO tb_tipos_pagamentos (tipo) VALUES ($1) RETURNING *',
    // o array contém os valores que serao passados como parametros para a query e são colocadosnas posições correspondentes em VALUES
    [ tipo]
    );
    res.status(201).json(pagamento.rows[0]); //Retorna um novo pagamento criado
    }catch (err){
        console.error('Erro ao criar um pagamento:', err);
        res.status(500).json({error: 'Erro ao criar um pagamento' });
    }
});




//Rota para atualizar um tipo de pagamento

app.put('/tipo_pagamentos/:id', async (req, res) => {
    const { id } = req.params; // pega o id da tarefa da URL
    const { tipo} = req.body; //pega os dados atualizados do corpo da requisição

    try {
        const pagamento = await pool.query(
        'UPDATE tb_tipos_pagamentos SET tipo = $1 WHERE id = $2 RETURNING *',
        [tipo, id]
    );

    if (pagamento.rowCount === 0 ) { //significa que não há nenhum tipo de pagamento com o ID fornecido.
        return res.status(404).json({error: 'Tipo de pagamento não encontrado'}); //Caso o tipo de pagamentoa não seja encontrada
        }
    res.status(200).json(pagamento.rows[0]); //Retorna um tipo de pagamento atualizado
    }catch (err){
        console.error('Erro ao atualizar o tipo de pagamento:', err);
        res.status(500).json({error: 'Erro ao atualizar o tipo de pagamento' });
    }
});



//Rota para deletar um tipo de pagamento

app.delete('/tipo_pagamentos/:id', async (req, res) => {
    const { id } = req.params; // pega a id da especialidade da URL


    try {
        const pagamento = await pool.query('DELETE FROM tb_tipos_pagamentos WHERE id = $1 RETURNING *', [id]);
        if (pagamento.rowCount === 0) { // significa que não há nenhum tipo de pagamento com o ID fornecido.
            return res.status(404). json({error: 'Tipo de pagamento não encontrado' }); // Caso a especialidade não seja encontrado
        }


        res.status(200).json({ message: 'Tipo de ´pagamento excluido com sucesso' }); // Retorna a mensagem de sucesso
    } catch (err) {
        console.error('Erro ao excluir tipo de pagamento:', err);
        res.status(500).json({ error: 'Erro ao excluir tipo de pagamento' });
    }
});



app.get('/pacientes', async(_,res) =>{
try{
    const paciente = await pool.query('SELECT * FROM tb_pacientes');
    res.status(200).json (paciente.rows);
   }catch(err) {
    console.error('Erro ao buscar paciente', err);
   }
});



//Rota para criar um novo paciente

app.post('/pacientes', async (req, res) => {
    //dados que o cliente enviou para criar um novo paciente
    const { nome, telefone, cpf} = req.body;
    try {
        const paciente = await pool.query(
    //insere os valores recebidos na tabela e retorna todos os campos da nova tarefa
    //($1, $2, $3) são placeholders usados para passar valores para a query de forma segura, evitando a injeção de SQL.
    'INSERT INTO tb_pacientes (nome, telefone, cpf) VALUES ($1, $2, $3) RETURNING *',
    // o array contém os valores que serao passados como parametros para a query e são colocadosnas posições correspondentes em VALUES
    [ nome, telefone, cpf]
    );
    res.status(201).json(paciente.rows[0]); //Retorna um novo paciente criado
    }catch (err){
        console.error('Erro ao criar um paciente:', err);
        res.status(500).json({error: 'Erro ao criar o paciente' });
    }
});




//Rota para atualizar um paciente

app.put('/pacientes/:id', async (req, res) => {
    const { id } = req.params; // pega o id da tarefa da URL
    const { nome, telefone, cpf} = req.body; //pega os dados atualizados do corpo da requisição

    try {
        const paciente = await pool.query(
        'UPDATE tb_pacientes SET nome = $1, telefone = $2, cpf = $3 WHERE id = $4 RETURNING *',
        [nome, telefone, cpf, id]
    );

    if (paciente.rowCount === 0 ) { //significa que não há nenhum paciente com o ID fornecido.
        return res.status(404).json({error: 'Paciente não encontrado'}); //Caso o paciente não seja encontrado
        }
    res.status(200).json(paciente.rows[0]); //Retorna o paciente atualizado
    }catch (err){
        console.error('Erro ao atualizar o paciente:', err);
        res.status(500).json({error: 'Erro ao atualizar o paciente' });
    }
});



//Rota para deletar um paciente

app.delete('/pacientes/:id', async (req, res) => {
    const { id } = req.params; // pega a id do agendamento da URL


    try {
        const paciente = await pool.query('DELETE FROM tb_pacientes WHERE id = $1 RETURNING *', [id]);
        if (paciente.rowCount === 0) { // significa que não há nenhum paciente com o ID fornecido.
            return res.status(404). json({error: 'paciente não encontrado' }); // Caso o paciente não seja encontrado
        }


        res.status(200).json({ message: 'Paciente excluido com sucesso' }); // Retorna a mensagem de sucesso
    } catch (err) {
        console.error('Erro ao excluir paciente:', err);
        res.status(500).json({ error: 'Erro ao excluir o paciente' });
    }
});









app.get('/agendamentos', async(_,res) =>{
try{
    const agendamentos = await pool.query('SELECT * FROM tb_agendamentos');
    res.status(200).json (agendamentos.rows);
   }catch(err) {
    console.error('Erro ao buscar agendamentos', err);
   }
});



//Rota para criar um novo agendamento

app.post('/agendamentos', async (req, res) => {
    //dados que o cliente enviou para criar um novo agendamento
    const { hora_date, pagamento_status, id_paciente, id_especialidade, id_tipos_pagamento} = req.body;
    try {
        const agendamentos = await pool.query(
    //insere os valores recebidos na tabela e retorna todos os campos da nova tarefa
    //($1, $2, $3, $4, $5) são placeholders usados para passar valores para a query de forma segura, evitando a injeção de SQL.
    'INSERT INTO tb_agendamentos (hora_date, pagamento_status, id_paciente, id_especialidade, id_tipos_pagamento) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    // o array contém os valores que serao passados como parametros para a query e são colocadosnas posições correspondentes em VALUES
    [ hora_date, pagamento_status, id_paciente, id_especialidade, id_tipos_pagamento]
    );
    res.status(201).json(agendamentos.rows[0]); //Retorna um novo agendamento criado
    }catch (err){
        console.error('Erro ao criar um agendamento:', err);
        res.status(500).json({error: 'Erro ao criar o agendamento' });
    }
});




//Rota para atualizar um agendamento

app.put('/agendamentos/:id', async (req, res) => {
    const { id } = req.params; // pega o id da tarefa da URL
    const { hora_date, pagamento_status, id_paciente, id_especialidade, id_tipos_pagamento} = req.body; //pega os dados atualizados do corpo da requisição

    try {
        const agendamentos = await pool.query(
        'UPDATE tb_agendamentos SET hora_date = $1, pagamento_status = $2, id_paciente = $3, id_especialidade = $4, id_tipos_pagamento = $5 WHERE id = $6 RETURNING *',
        [hora_date, pagamento_status, id_paciente, id_especialidade, id_tipos_pagamento, id]
    );

    if (agendamentos.rowCount === 0 ) { //significa que não há nenhum agendamento com o ID fornecido.
        return res.status(404).json({error: 'Agendamento não encontrado'}); //Caso o agendamento não seja encontrado
        }
    res.status(200).json(agendamentos.rows[0]); //Retorna o agendamento atualizado
    }catch (err){
        console.error('Erro ao atualizar o agendamento:', err);
        res.status(500).json({error: 'Erro ao atualizar o agendamento' });
    }
});



//Rota para deletar um agendamento

app.delete('/agendamentos/:id', async (req, res) => {
    const { id } = req.params; // pega a id do agendamento da URL


    try {
        const agendamentos = await pool.query('DELETE FROM tb_agendamentos WHERE id = $1 RETURNING *', [id]);
        if (agendamentos.rowCount === 0) { // significa que não há nenhum agendamento com o ID fornecido.
            return res.status(404). json({error: 'agendamento não encontrado' }); // Caso o agendamento não seja encontrado
        }


        res.status(200).json({ message: 'Agendamento excluido com sucesso' }); // Retorna a mensagem de sucesso
    } catch (err) {
        console.error('Erro ao excluir agendamento:', err);
        res.status(500).json({ error: 'Erro ao excluir o agendamento' });
    }
});








const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor iniciado!')
});