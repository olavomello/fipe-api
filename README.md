# FIPE API

API para leitura de tipos, marcas e modelos de veículos da Tabela FIPE brasileira.

⚠️ Mantive os mesmos padrões de nomenclatura de propriedades dos dados recebidos pela FIPE para facilitar a transposição entre sistemas.

### Linguagem
NodeJs

**Tabela FIPE atualizada : 03/2023**


### Variáveis de ambiente

```bash
# BASIC CONFIGS
DEBUG=false
SERVER_PORT=3000
CACHE_ENABLED=true

# FIPE CONFIGS ( TABLE = 295 // Março/2023 )
FIPE_TABLE=295

# DATABASE CONFIGS
DB_URI=mongodb+srv://[USER]:~[PASS]@[URL]/?retryWrites=true&w=majority
DB_NAME=[DATABASE-NAME]
```

### Database Cache

Se habilitado o sistema armazena dados de consulta no banco de dados ( MongoDB ) e realiza as próximas consultas utilizando dados do DB, evitando assim paralizações devido a alto volume de consultas á API da FIPE e agilizando o processamento dos dados em momentos onde a API da FIPE está sobrecarregada e com alto delay.

*O cache habilitado demonstrou redução de tempo de reposta de 50% a +60% dependendo da latência da API da FIPE.*  

## Rodando a aplicação
Segue abaixo passo a passo para rodar a FIPE API em sua máquina local.

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
Desta forma o nodemon será ativado e você poderá trabalhar em atualizações enquanto o server está rodando, em modo live-reload.

```bash
yarn dev
```

Testes utilizando `Jest`. Para rodar `tests` utilize comando abaixo :

```bash
yarn test
```

Acesse através do endereço abaixo:

```bash
http://localhost:3000/v1/
```

Observações:

Para derrubar todos os serviços, basta utilizar as teclas `CTRL+C`, que é o padrão dos terminais para matar processos.

### Endpoints

São endpoints simples :

Usage : /type
GET **types**

#### Result
```json
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
```

GET **brands**
#### Usage
/brands/:type ( sendo `type` o Value to tipo desejado )

#### Result
```json
{
	"success": true,
	"updatedAt": "2023-03-01T00:00:00.000Z",
	"type": "1",
	"type_label": "carros",
	"data": [
		{
			"Label": "Acura",
			"Value": "1"
		}
  ]
}
```

GET **models**
#### Usage
/models/:type/:brand ( sendo `type` o Value to tipo desejado e `brand` o Value da marca desejada )

#### Result
```json
{
	"success": true,
	"updatedAt": "2023-03-01T00:00:00.000Z",
	"type": "1",
	"type_label": "carros",
	"brand": "1",
	"data": [
		{
			"Label": "Integra GS 1.8",
			"Value": 1
		}
	]
}
```

GET **years**
#### Usage
/years/:type/:brand/:model ( sendo `type` o Value to tipo desejado, `brand` o Value da marca desejada e `model` o Value do modelo desejado )

#### Result
```json
{
	"success": true,
	"updatedAt": "2023-03-01T00:00:00.000Z",
	"type": "1",
	"type_label": "carros",
	"brand": "1",
	"model": "1",
	"data": [
		{
			"Label": "1992 Gasolina",
			"Value": "1992-1"
		}
	]
}
```

GET **details**
#### Usage
/details/:type/:brand/:model/:year ( sendo `type` o Value to tipo desejado, `brand` o Value da marca desejada, `model` o Value do modelo desejado e `year` o ano do modelo desejado em formato YYYY )

#### Result
```json
{
	"success": true,
	"updatedAt": "2023-03-01T00:00:00.000Z",
	"type": "1",
	"type_label": "carros",
	"brand": "1",
	"model": "1",
	"year": "1992",
	"data": {
		"Valor": "R$ 12.062,00",
		"Marca": "Acura",
		"Modelo": "Integra GS 1.8",
		"AnoModelo": 1992,
		"Combustivel": "Gasolina",
		"CodigoFipe": "038003-2",
		"MesReferencia": "março de 2023 ",
		"Autenticacao": "gwrlykvqsc",
		"TipoVeiculo": 1,
		"SiglaCombustivel": "G",
		"DataConsulta": "sexta-feira, 24 de março de 2023 18:56"
	}
}
```

## Motivação

Criei esta API simples pois em meus projetos, assim como em projetos de amigos, sempre há a necessidade de carregar dados atualizados de veículos e muitas vezes os sistemas terceiros acabam ficando fora do ar e derrubando funções importantes de aplicações que os utilizam.

Espero que seja útil ;)


## Linkedin
[Bora nos conectar no Linkedin ! 😉🔥](https://www.linkedin.com/in/olavo-mello/)
