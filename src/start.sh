#!/bin/sh
for jar in /Users/tangpeng/IdeaProjects/mms/target/mms-1.0/WEB-INF/lib/*
do JAR_CLASSPATH=$JAR_CLASSPATH:$jar 
done
echo "classpath="$JAR_CLASSPATH
JAVA -classpath "./WEB-INF/classes:$JAR_CLASSPATH" com.derby.StartDerby
JAVA -classpath "./WEB-INF/classes:$JAR_CLASSPATH" com.tangpeng.jetty.JettyStart
