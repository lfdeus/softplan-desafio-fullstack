# Softplan - Fullstack - Gestão de Processos - Back

Serviço back do sistema de Gestão de Processos. (Desafio Fullstack)

Desenvolvido em Spring Boot 2.3.3.RELEASE

## Como subir o sistema ?

### 1. Configurar "pom.xml"
 
 Caso queira alterar alguma configuração. 

    <profile>
	    <id>dev</id>
		<properties>
            <DB_URL>jdbc:h2:file:~/desafioSoftplan</DB_URL>
        	<DB_USERNAME>sa</DB_USERNAME>
        	<DB_PASSWORD>softplan</DB_PASSWORD>
        	<SERVER_PORT>8087</SERVER_PORT>
        </properties>
	</profile>

### 2. URL local

O sistema estará disponível na url:

    localhost:8087

## Documentação API

    localhost:8087/swagger-ui.html

