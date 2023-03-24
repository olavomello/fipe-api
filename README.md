#FIPE API

API para leitura de tipos, marcas e modelos de veículos da Tabela FIPE brasileira.
Mantive os mesmos padrões de nomenclatura de propriedades dos dados recebidos pela FIPE para facilitar a transposição entre sistemas;

**Tabela FIP atualizada : 03/2023**

Rodar a FIPE API em sua máquina local é uma tarefa extremamente simples.

### Dependências globais


```bash
yarn install 
```

### Rodar o projeto

Para rodar o projeto localmente, basta rodar o comando abaixo:

```bash
yarn start
```

Para rodar em modo DEV utilize o comando abaixo :

```bash
yarn dev
```
Desta forma o nodemon será ativado e você poderá trabalhar em atualizações enquanto o server está rodando, em modo live-reload.

Acesse através do endereço abaixo:

```bash
http://localhost:3000/v1/
```

Observações:

- Para derrubar todos os serviços, basta utilizar as teclas `CTRL+C`, que é o padrão dos terminais para matar processos.

### Endpoints

São 3 endpoints simples 
GET **types**
{
	"success": true,
	"data": [
		{
			"Value": 1,
			"Label": "carros"
		},
		{
			"Value": 2,
			"Label": "motos"
		},
		{
			"Value": 3,
			"Label": "caminhões"
		}
	]
}

GET **brands**
Usage : brands/:type ( sendo `type` o Value to tipo desejado )

// Result
{
	"success": true,
	"updatedAt": "2023-03-01T00:00:00.000Z",
	"type": "2",
	"type_label": "motos",
	"data": [
		{
			"Label": "ADLY",
			"Value": "60"
		},
		...
}

GET **models**
Usage : models/:type/:brand ( sendo `type` o Value to tipo desejado e `brand` o Value da marca desejada )

## Motivação

Criei esta API simples pois em meus projetos, assim como em projetos de amigos, sempre há a necessidade de carregar dados atualizados de veículos e muitas vezes os sistemas terceiros acabam ficando fora do ar e derrubando funções importantes de aplicações que os utilizam.

Espero que seja útil ;)