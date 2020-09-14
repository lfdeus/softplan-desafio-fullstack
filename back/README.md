# Softplan - Fullstack - Projeto Back - Gestão de Processos

Serviço back do sistema de Gestão de Processos. (Desafio Fullstack)

## Requisitos

- [Spring Boot 2.3.3](https://spring.io/projects/spring-boot)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Postgres](https://www.postgresql.org/download/)
- [Maven 3](https://maven.apache.org)
- [Spring Data](http://projects.spring.io/spring-data/)


## Como subir o sistema ?

### 1. Configurar "pom.xml"

    <profile>
	    <id>dev</id>
		<properties>
			<DB_URL>jdbc:postgresql://localhost:5432/softplan</DB_URL>
			<DB_USERNAME>postgres</DB_USERNAME>
			<DB_PASSWORD>lfdeus</DB_PASSWORD>
			<DB_CONNECT_TIMEOUT>1000</DB_CONNECT_TIMEOUT>
			<SERVER_PORT>8087</SERVER_PORT>
		</properties>
	</profile>

### 2. Executar local

    mvn spring-boot:run

Executar o comando:

    mvn clean install



### 3. Agora para rodar o projeto basta executar o comando:

## Author

Released under the Apache License 2.0. See the [LICENSE](https://github.com/codecentric/springboot-sample-app/blob/master/LICENSE) file.

