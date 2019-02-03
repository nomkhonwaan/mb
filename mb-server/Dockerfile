FROM openjdk:8-jre-alpine
VOLUME /tmp
ENV JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -XshowSettings:vm"
WORKDIR /opt/app-root
COPY ./build/libs/*.jar mb-server.jar
ENTRYPOINT ["/bin/sh", "-c", "java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -jar mb-server.jar"]
