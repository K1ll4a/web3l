# ======================
# ==== BUILD STAGE =====
# ======================
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY backend/pom.xml .
RUN mvn -q -Dmaven.test.skip=true dependency:go-offline

COPY backend/src ./src
RUN mvn -q -Dmaven.test.skip=true clean package

# ========================
# ==== RUNTIME STAGE =====
# ========================
FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT java \
  --add-opens=java.base/java.lang=ALL-UNNAMED \
  --add-opens=java.base/java.lang.reflect=ALL-UNNAMED \
  -jar app.jar
