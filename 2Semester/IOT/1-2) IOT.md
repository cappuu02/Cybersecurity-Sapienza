
# What is IOT? (PDF1)
The term IoT was first coined in 1999 by Kevin Ashton in the context of supply chain management, and was redefined during the following years.

>IOT = Sensors + Networks + Data + Services

IoT can be treated as the extension of the contemporary internet services to enclose different objects, which can become part of the IoT when embedded with sensors, actuators, microcontrollers.

IoT binds together the IT and OT domains:
- **IT** consists of the secure connectivity of servers, databases and applications. 
- **OT** is concerned with the industrial work and combines things like sensors and devices connected to the machines or some other equipment. It supervises devices and processes on physical systems (e.g., Industries, roadways, production services etc).

```ad-info
Internet of Things allows all things to communicate each other.

```


# Smart Objects
Like human cells, smart objects represent the building blocks of an IoT system and must have the ability of:
- sensing
- computing
- communicating

>**IoT revolution**: transform an isolated ordinary object into interactive smart object.
>Smart objects are made of several components…

![[28.png]]
## Sensors
Sensors embedded in the device allows the object to 
- sensing
- measuring the changes in the environment
- convert the physical quantity into a digital representation
The physical quantity is passed into some computational unit

## Processing unit (CPU)
Gathers, processes and analyzes the data acquired from the sensors.
The computations, need some control signals that prompt the actuator according to the need. CPU allow to Control communication and power system.

>The type of processing unit varies according to the needs and kind of processing to be used by the applications. Micro controllers are widely used technology in smart objects.

## Memory
Stores key information such as the smart object identifier, physical properties. 
Allows the computation and communication abilities of the device.
- Can store sensed data.
- Varies from few KB to GB.

## Actuators
Data collected by the sensors is stored and processed and can in turn trigger the actuators. An actuator receives control signal and produces some response to the physical world.

```ad-example

A sensor senses the level of moist in a field. If the level of moist is below a given threshold, we want to open up the water pump and irrigate our field. In this case, the actuator is triggered and turns the pump switch on and off accordingly.
```

## Communication unit
- Allows the smart objects to communicate with other devices for sharing information/data.
- Communication may take place between two or more smart objects or to the outside world through the network.
- The wireless connectivity is preferred more over the wired connectivity (cost, ease of deployment)

>In the previous image is the Wi-Fi-Logo

## Power source
- Power sources may be batteries, solar power, wind power, main supply.
- The requirements of power consumption vary greatly according to the scenarios (deployment area, switching between the active and sleep mode, accessibility, the power source being used, criticality of the information etc).

>In the previous image is the Battery-Logo


## Smart Objects - continue
```ad-summary
title: Important
Notice that not all smart objects are composed of all the components. A smart object could be just a sensor that continuously sends data to a different object equipped with a microprocessor and an actuator.

```

Desirable features of smart objects are:
- small size
- powerful processing unit
- low power consumption
- good communication capabilities.



## Evolution 
IoT systems can be very different from one another. For example we can have different IoT systems, like:
![[30a.png]]
Despite all the differences, all IoT systems have a similar architecture. Microcontrollers and tiny wireless devices were developed more than 25 years ago, but things started to change some time after that. Three game changers are:
- ARM cortex M series
- Bluetooth low energy
- 6LoWPAN (Low power wireless personal area networks)

Today all is possible thanks to:
- now we can build very inexpensively energy-efficient microcontrollers, allowing to deploy thousands of small devices in IoT systems.
- Because we now have protocols for connecting small devices together which are very energy efficient.
- Because we have new Internet standards to compress internet packets

## Key Characteristics of IoT systems

- Dispositivi molto diversi tra loro, con scopi, capacità, caratteristiche e protocolli di comunicazione differenti
- Deployment massiccio: miliardi di dispositivi interconnessi tra loro e tramite Internet, potenzialmente oltre le capacità attuali della rete
- Progettazione di architetture di rete e storage per dispositivi smart
- Protocolli di comunicazione efficienti
- Dispositivi connessi tra loro e a Internet
- Connettività locale (es: sciami di droni)
- Comunicazione a corto raggio
- Nuovi protocolli di comunicazione rispetto a Internet tradizionale
- Automazione industriale e sistemi di trasporto con comunicazione ultra-affidabile e a bassa latenza
- Comunicazione a basso consumo e basso costo
- Dispositivi IoT spesso piccoli, alimentati a batteria e con risorse limitate
- Auto-organizzazione e auto-riparazione per ridurre la manutenzione
- Dispositivi alternano modalità sleep/wake per risparmiare energia
- Mobilità dei dispositivi che cambia dinamicamente la topologia di rete
- Sistemi IoT esposti a diversi tipi di attacchi
- Gestione di dati sensibili in alcuni sistemi IoT
- Programmazione efficiente per decisioni intelligenti basate su dati elaborati

## Challenges of IoT
- **Security and Privacy Concerns**: IoT devices are vulnerable to hacking, data breaches, and unauthorized access.
- **Data Overload and Management**: IoT generates massive amounts of data, requiring efficient storage, processing and analysis.
- **Interoperability and Standardisation**: Lack of common standards can hinder the integration of devices from different manufacturers.
- **Scalability**: Scaling IoT networks while maintaining performance, security and efficiency is difficult.
- **Ethical and Legal Issues**: Collecting and analyzing personal data raises questions about consent.
- **Energy Efficiency and Battery Life**
- **ROI (Cost and Return On Investment)**
- **Latency and Reliability**
# Cool Application (Just For Info)

## Smart Cities
A **smart city** is an urban area that uses digital technology to collect data and to operate/provide services

Smart cities integrate information and communication technology, and IoT
devices to optimize city services and connect to citizens.

Applications include **traffic and transportation systems**, power plants, utilities, urban forestry, water supply networks, waste disposal, criminal investigations, information systems, schools, libraries, hospitals, and other community services.

## Smart Waste Management
Smart Waste Management System
- Each trash can is equipped with wireless ultrasonic fill-level sensor (to detect when the trash can is full or even too smelly)
- Uses cellular based wireless technologies to connect to a control centre
- Can be solar powered
- The control center monitors real time trash can fill level and plans the trash collection schedule and the collection routes.

This increase waste collection efficiency by 90%

## Smart Street Lights
In a smart street light system, street lights adjust their brightness when a car or a pedestrian is approaching. Light intensity can be adjusted under different
weather conditions.

Remote access to street lights. No need to employ people full time to drive around the city after dark looking for burnt out streetlights

A smart street lighting system incorporates a cluster of streetlights that can communicate with each other.
- Lights are equipped with lighting and motion sensors triggering some actuators (e.g., if motion is sensed, bright up the light).
- Sensed data is sent to local relay, that manages and transmits the relevant data often by a cellular-based modem to a secure server, that captures the data for further analysis.
- Data can be sent to a central controller and exploited for other smart city systems, e.g., Smart Parking, Traffic and Security Monitoring






# IOT Architectures (PDF2)

## Drivers of IOT Architectures
Two key differences between IT and IoT:
1. IT systems are mostly concerned with reliable and continuous support for business applications such as email, web, database, etc., IoT is all about the data generated by sensors and how data is used.
2. IT systems are mostly running on computers and servers. A IoT system is also composed by ordinary objects that are made “smart” and produce a lot of data.

>What should we be taking into consideration when designing an IoT architecture?

### Scale
The scale of typical IT networks is very smaller than the scale of IoT endpoints.
IPv4 address space has reached exhaustion and is unable to meet IoT’s scalability requirements. **Scale can be met only by using IPv6**.

### Security
IoT devices, especially those on wireless sensor networks (WSNs), are often physically exposed to the world.

- Traditional models of IT security do not always work for the new attack vectors
- IoT devices vary widely in hardware, software, and communication protocols
- Many devices have limited computational resources, making it difficult to implement strong encryption, firewalls, or intrusion detection systems.
- Every IoT endpoint node on the network must be part of the overall security strategy and must support device-level authentication and link encryption.

### Constrained devices and networks
Most IoT sensors are designed for a single job, and they are typically small and inexpensive
- Limited power, CPU, memory, and they transmit only when there is something important to say
- Large scale of the devices + large, uncontrolled environments = lossy network supporting low data rates
- This is very different from traditional IT networks, which enjoy Gb connections and endpoints with powerful CPUs.

### Data
In IoT, data enables business to deliver new IoT services that enhance the user experience and reduce costs.
- Most IoT generated data is unstructured.
- When all the data is combined, it can be difficult to manage and analyse it effectively.
- Data analytics capabilities need to be distributed throughout the IoT network, from the edge to the cloud. In traditional IT networks, analytics and applications typically run only in the cloud.


### Compute and network assets in IoT
Compute and network assets used in IoT can be very different from those in IT
environments.
- This is because IoT devices are deployed in various environments, which belong to different OT environments.
- Deciding what devices to deploy is key factor:
	- Thermometers can be place near the furnaces of a steel mill, or used for cold chains
	- Devices can be placed in environments with very different humidities, or even underwater.
	- Some devices are subject to constant kinetic vibrations, or to abrupt ones

## IoT Architecture layers
![[31a.png|700]]
### Sensor layer
Sensor layer or perception layer consists of heterogeneous sensors and actuators, that sense the environment, collect information for processing to gain useful insights.
- Different kind of sensors deployed, like temperature, motion, humidity, etc.
- The sensor layer digitalizes, creates a channel, and transfers data to the next layer.
- It is the major source of big data to be processed by next layers.

#### Sensor layer - classification (1)
Smart devices can be:
- ==Battery powered== or ==power connected==: 
	- This classification is based on whether the object carries its own energy supply or receives continuous power from an external power source.
- Battery-powered things can be moved more easily than line-powered objects.
- Batteries limit the lifetime and amount of energy that the object is allowed to consume, thus driving transmission range and frequency.

```ad-example
An outdoor battery-powered humidity sensor, A smart motion camera,
power connected

```

#### Sensor layer - classification (2)
Smart devices can be:
- ==Mobile== or ==static==: This classification is based on whether the “thing” should move or always stay at the same location.
- A thing can be moved because it is located on a moving object.
- The frequency of a movement may also vary, from occasional to permanent.

```ad-example
Self-driving car, Smart thermometer

```

#### Sensor layer - classification (3)
Smart devices can have:
- ==Low== or ==high== **reporting frequency**: Con quale frequenza l'oggetto deve segnalare i parametri monitorati.
- A color sensor can report data once a day.
- A motion sensor may report acceleration several hundred times per second.
- Higher frequencies drive higher energy consumption.

#### Sensor layer - classification (4)
Smart devices can produce:
- ==Simple== or ==rich== **data**: This classification is based on the quantity of data exchanged at each report cycle. A humidity sensor in a field may report a simple daily index value, while an engine sensor may report hundreds of parameters, from temperature to pressure, gas,  velocity, compression speed, carbon index, and many others.
• Richer data typically drives higher power consumption.

#### Sensor layer - classification (5)
**Sensing range:**
È l'area fisica entro cui un sensore può **rilevare** fenomeni o misurare parametri (es. temperatura, movimento, luce). Può essere piccolo o ampio.
Dipende dalla tecnologia del sensore.

**Transmission range:**
È la distanza massima in cui il segnale inviato dal sensore (es. dati via Wi-Fi, Bluetooth, LoRa) può essere **ricevuto** da altri dispositivi.
- Può essere **limitato** (es. Bluetooth: ~10 metri) o **esteso** (es. LTE: chilometri).
- Determina come i nodi IoT comunicano tra loro o con un gateway.

### IoT architecture: gateway and network layer
The gateway and network layer transfers data created by the sensor layer through secure channels.
- Uses different wireless technologies to transmit data.
- Can also perform data storage and processing.

#### Network layer - M2M
Nei sistemi IoT, i dispositivi comunicano tra loro per cooperare e si basano su protocolli di comunicazione macchina-macchina (M2M).
- Gli oggetti intelligenti che comunicano tra loro formano reti autonome che possono essere classificate in base alla portata di trasmissione dei dispositivi.
- La comunicazione M2M è per lo più wireless, realizzata tramite protocolli diversi e consente una comunicazione autonoma.


![[2.png]]
![[3.png]]

#### Network layer - M2M Topologies 
Different M2M protocols support different topologies that define the connections between smart devices.
![[4.png]]
![[5.png]]

The choice of what topology (and protocol) to use, highly depends on the application of the IoT system.
- Mesh topology are more reliable, since they have redundant links and the failure OF one link does not necessarily disconnect the network.
- Nevertheless, keeping more connections influences the power consumption of the devices.
- Topologies depend also on the transmission range of the devices (trivially, two devices are connected by a link in a topology only if they are within the transmission range of one another)
- In remote areas when devices can possibly be very far apart from each other, it might be necessary to leverage satellite communication.

#### Network layer - Gateways 
Data collected from a smart object may need to be forwarded to a central station (i.e., a server, a data center, or more generally the cloud) where data is processed.
- The station is often far from the smart object, and requires an Internet connection.
- Many small IoT devices do not support the a full TCP/IP stack, i.e., they cannot access the internet directly (when they do, they form a peer-to-peer network).
-  Gateways are responsible for bridging the sensors/smart devices with the internet to transmit data to a central station, but they can also act as edge servers!

![[6.png]]

### Network layer - IoT Gateways vs Routers
Both IoT Gateways and Routers are networking devices laying in the Internet
space.

**IoT Gateways**
Supporta un'ampia varietà di protocolli (traduzione di protocolli, monitoraggio e controllo remoti). Basso consumo energetico, edge computing (capacità di elaborazione locale)
Gestisci grandi quantità di dati (filtro ed elaborazione dati, raccolta e aggregazione dati, gestione della sicurezza). Inoltro pacchetti (gestione della connettività)

Routers:
- Limited protocol support
- Not optimised for low power
-  Packet forwarding

### Network layer - Gateways examples

```ad-example
title: Example1
![[7.png]]


```

```ad-example
title: Example2
![[8.png]]


```

```ad-example
title: Example3
![[9.png]]


```

## IoT architecture: application and analytics layer
The application and analytics layer provides the requested services to IoT users.
- It interprets data using software applications. Applications may monitor, control, and provide reports based on the analysis of the data.
- Data driven decision making.

### Applications and Analytics Layer - Applications
Once data coming from different sensors is transmitted to a central station through the network via a gateway, applications that running on top of the central station, analyse the data.
- IoT applications are very diverse depending on the considered IoT system
- Think of the IoT examples in the previous lecture: an application for baby monitoring has very different features and goals than an application for smart cities.
-  From an architectural standpoint, we can classify IoT applications into two main types:

**Analytics Application**
Collects data from multiple smart objects, processes it and displays the resulting information. The display can be about any aspect of the IoT system, e.g., historical reports, statistics, trend, individual system states. The application processes the data to convey a view of the network.

**Control application**
Controls the behaviour of the smart objects, allowing to control complex aspects of an IoT system with a logic that cannot be programmed inside a single IoT device. The program is too complex to fit into the local system or requires data from other objects.E.g., pressure sensor connected to a pump. The control application increases the pump speed when
the sensor senses a drop in pressure.


### Applications and Analytics Layer - Analytics
Analytics è un termine generico che descrive l'elaborazione delle informazioni per dare un senso ai dati raccolti. In IoT, una possibile classificazione della funzione di analisi è la seguente:

**Data Analytics**
Elaborazione dei dati raccolti da oggetti intelligenti e combinazione di tali dati per fornire una vista intelligente correlata al sistema IoT. L'analisi dei dati può anche monitorare il sistema IoT

```ad-example

Ad esempio, temperatura, pressione, vento, umidità e livelli di luce raccolti da migliaia di sensori possono essere combinati e quindi elaborati per determinare la probabilità di una tempesta e il suo possibile percorso, tramite il coinvolgimento di modelli di algoritmi complessi. L'analisi dei dati può anche monitorare il sistema IoT stesso, ad esempio, un robot in una fabbrica può segnalare dati sui propri movimenti per monitorarne il degrado.

```

**Network Analytics**
Network Analytics **elabora informazioni sulla connettività del sistema IoT**.
La perdita o il degrado della connettività comporta la perdita di dati dai sensori e può talvolta avere effetti drammatici (ad esempio, veicoli autonomi, fabbriche).

## Edge, Fog and Cloud Computing

### Remote Computing
Remote Computing (Fog/Cloud) offer more flexibility and scalability than hosting on a
local server.
- Reduced costs.
- No need to buy expensive equipment, configuring and managing mainframe computers and infrastructures.
- Increased speed.
- Availability of enterprise applications, no need to wait weeks for the IT to respond to a request, purchase and configure supporting hardware and install software.
- Scalability.
- You pay for what you need instead of purchasing excess capacity that is unused most of the time.
- Flexibility.
- Services can be installed on remote servers and deliver better customer response time

#### Cloud/Fog/Edge5
![[10.png]]

### Edge Computing
- Edge computing is a distributed architecture in which client data is processed at the periphery of the network, i.e., as geographically close to the source of data as possible. 
- In a IoT system, edge computing is performed by embedded systems, local computers/servers, IoT gateways to provide initial processing and filtering of all the data continuously sent from sensors. 
- Data does not travel through the Internet, but is transmitted from the sensors using IoT protocols.

### Cloud Computing
Cloud computing is the delivery of on-demand computing resources physical or virtual servers, data storage, networking capabilities, application development tools, software, AI-powered analytic platforms and more—over the internet with pay-per-use pricing.

- Resources are dynamically assigned and reassigned among multiple users and scale up and down in response to user’s needs.
- Cloud data centres are connected to the Internet with very high speed, high capacity fibre optical cables.

### Fog Computing
Fog computing lies in between edge and cloud computing.
- The concept was introduced by Cisco and represents a decentralised infrastructure that places storage and processing components (e.g., servers) at the edge of the cloud.
- Depending on the IoT application, fog computing can provide more power resources and storage capacity than edge devices with lower costs than cloud resources.
- Fog servers usually located in LANs.
- Difference with Edge layer is blurry.

![[11.png]]

**Why do we need the Fog if we have the Cloud?**
Offload the cloud, specially after the evolution of IoT.
- Optimised use of network and computing resources.
- Reducing latency.
- Reducing transport costs through the Internet.
- Supports cellular connections.

### “X as a Service” XaaS
Cloud computing allows businesses to deploy and run their applications on cloud servers.
- Users can access the services via requests to the Cloud hosting the application.
- XaaS “anything as a service”: delivery of solutions, application, products, tools and technologies as services, which exist on some Cloud platform.

### IaaS/PaaS/SaaS
![[29.png]]

----

## Example of optimization for task offloading on the fog

![[12.png]]
![[14.png]]
![[15.png]]

This kind of problem are called: **Integer Linear Programming Problem**