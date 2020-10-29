# Samply Webjars

This library offers various JavaScript and CSS projects as webjars.
You can include those webjars as a dependency to your project and use them
right away.

The Samply Webjars include the following CSS projects:


- Font Lato 2.0
- Samply

## Usage

Those are just examples. You can use `h:outputStylesheet` just as well as `link`.

```xml
<link type="text/css" rel="stylesheet" href="#{resource['webjar:font-lato/css/font-lato.css']}"/>
<link type="text/css" rel="stylesheet" href="#{resource['webjar:samply/css/buttons.css']}"/>
```


## Build

Use maven to build the jar:

```
mvn clean package
```

Use it as a dependency:

```xml
<dependency>
    <groupId>de.samply.webjar</groupId>
    <artifactId>samply</artifactId>
    <version>VERSION</version>
</dependency>
```
