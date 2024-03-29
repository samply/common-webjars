# Partially Depreciated

Please switch to using http://www.webjars.org/ instead.

However, for 
- "Font Lato" and 
- samply specific CSS 

the samply.common.webjars may be used. (We could not find an official Webjar for "Font Lato")

# Samply Common Static

This project offers static javascript, css and image files.  It bundles well
known libraries, e.g. bootstrap, into `jar` files that can be used in Servlet
containers (`>= 3.0`).

We decided to build our own webjars to be more flexible. Some OSSE projects
use primefaces which uses a specific version of jQuery.

# Features

- ~~Bootstrap 3.3.2~~
- ~~jQuery 1.11.2~~
- ~~jQuery-UI 1.11.2~~
- Font Lato 2.0
- ~~Font Awesome 4.3.0~~

# License

The external projects (bootstrap, jquery, select2, jquery-ui) are licensed under
the same license as in the upstream project.

# Build

In order to build this project, you need to configure maven properly. 
See [Samply.Maven](https://bitbucket.org/medinfo_mainz/samply.maven)
for more information.

Use maven to build the `jar` file:

```
mvn clean package
```

Use it as a dependency:

```xml
<dependency>
    <groupId>de.samply</groupId>
    <artifactId>common-samply</artifactId>
    <version>${version}</version>
</dependency>
```

 ## License
        
 Copyright 2020 The Samply Development Community
        
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
        
 http://www.apache.org/licenses/LICENSE-2.0
        
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
