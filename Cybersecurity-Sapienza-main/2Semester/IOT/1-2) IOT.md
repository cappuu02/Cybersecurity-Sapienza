 
# What is IOT? (PDF1)
The term IoT was first coined in 1999 by Kevin Ashton in the context of supply chain management, and was redefined during the following years.

>IOT = Sensors + Networks + Data + Services

```ad-abstract
title: Definizione

L'IoT può essere considerato come l'estensione degli attuali servizi Internet per includere diversi oggetti, che possono diventare parte dell'IoT quando integrati con sensori, attuatori e microcontrollori.
```


IoT binds (unisce) together the IT and OT domains:
- **IT** consists of the secure connectivity of servers, databases and applications. 
- **OT** is concerned with the industrial work and combines things like sensors and devices connected to the machines or some other equipment. It supervises devices and processes on physical systems (e.g., Industries, roadways, production services etc).

```ad-info
Internet of Things allows all things to communicate each other.

```


## Smart Objects
Like human cells, smart objects represent the building blocks of an IoT system and must have the ability of:
- sensing
- computing
- communicating

>**IoT revolution**: transform an isolated ordinary object into interactive smart object.
>Smart objects are made of several components…

![[28.png]]
### Sensors
Sensors embedded in the device allows the object to 
- sensing
- measuring the changes in the environment
- convert the physical quantity into a digital representation
The physical quantity is passed into some computational unit

### Processing unit (CPU)
Raccoglie, elabora e analizza i dati acquisiti dai sensori. I calcoli necessitano di alcuni segnali di controllo che sollecitano l'attuatore in base alle necessità. La CPU consente di controllare la comunicazione e il sistema di alimentazione.

>The type of processing unit varies according to the needs and kind of processing to be used by the applications. Micro controllers are widely used technology in smart objects.

### Memory
Stores key information such as the smart object identifier, physical properties. 
Allows the computation and communication abilities of the device.
- Can store sensed data.
- Varies from few KB to GB.

### Actuators
Data collected by the sensors is stored and processed and can in turn trigger the actuators. An actuator receives control signal and produces some response to the physical world.

```ad-example

A sensor senses the level of moist in a field. If the level of moist is below a given threshold, we want to open up the water pump and irrigate our field. In this case, the actuator is triggered and turns the pump switch on and off accordingly.
```

### Communication unit
- Allows the smart objects to communicate with other devices for sharing information/data.
- Communication may take place between two or more smart objects or to the outside world through the network.
- The wireless connectivity is preferred more over the wired connectivity (cost, ease of deployment)

>In the previous image is the Wi-Fi-Logo

### Power source
- Power sources may be batteries, solar power, wind power, main supply.
- The requirements of power consumption vary greatly according to the scenarios (deployment area, switching between the active and sleep mode, accessibility, the power source being used, criticality of the information etc).

>In the previous image is the Battery-Logo


### Smart Objects - continue
```ad-summary
title: Important
Notice that not all smart objects are composed of all the components. A smart object could be just a sensor that continuously sends data to a different object equipped with a microprocessor and an actuator.

```

Desirable features of smart objects are:
- small size
- powerful processing unit
- low power consumption
- good communication capabilities.



### Evolution 
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

### Key Characteristics of IoT systems

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

### Challenges of IoT
- **Security and Privacy Concerns**: IoT devices are vulnerable to hacking, data breaches, and unauthorized access.
- **Data Overload and Management**: IoT generates massive amounts of data, requiring efficient storage, processing and analysis.
- **Interoperability and Standardisation**: Lack of common standards can hinder the integration of devices from different manufacturers.
- **Scalability**: Scaling IoT networks while maintaining performance, security and efficiency is difficult.
- **Ethical and Legal Issues**: Collecting and analyzing personal data raises questions about consent.
- **Energy Efficiency and Battery Life**
- **ROI (Cost and Return On Investment)**
- **Latency and Reliability**
## Cool Application (Just For Info)

### Smart Cities
A **smart city** is an urban area that uses digital technology to collect data and to operate/provide services

Smart cities integrate information and communication technology, and IoT
devices to optimize city services and connect to citizens.

Applications include **traffic and transportation systems**, power plants, utilities, urban forestry, water supply networks, waste disposal, criminal investigations, information systems, schools, libraries, hospitals, and other community services.

### Smart Waste Management
Smart Waste Management System
- Each trash can is equipped with wireless ultrasonic fill-level sensor (to detect when the trash can is full or even too smelly)
- Uses cellular based wireless technologies to connect to a control centre
- Can be solar powered
- The control center monitors real time trash can fill level and plans the trash collection schedule and the collection routes.

This increase waste collection efficiency by 90%

### Smart Street Lights
In a smart street light system, street lights adjust their brightness when a car or a pedestrian is approaching. Light intensity can be adjusted under different
weather conditions.

Remote access to street lights. No need to employ people full time to drive around the city after dark looking for burnt out streetlights

A smart street lighting system incorporates a cluster of streetlights that can communicate with each other.
- Lights are equipped with lighting and motion sensors triggering some actuators (e.g., if motion is sensed, bright up the light).
- Sensed data is sent to local relay, that manages and transmits the relevant data often by a cellular-based modem to a secure server, that captures the data for further analysis.
- Data can be sent to a central controller and exploited for other smart city systems, e.g., Smart Parking, Traffic and Security Monitoring
# IOT Architectures (PDF2)

## Drivers of IOT Architectures
Due differenze fondamentali tra IT e IoT:
1. I sistemi IT sono principalmente interessati al supporto affidabile e continuo per applicazioni aziendali come e-mail, web, database, ecc., IoT riguarda i dati generati dai sensori e il modo in cui vengono utilizzati.
2. I sistemi IT sono principalmente in esecuzione su computer e server. Un sistema IoT è anche composto da oggetti ordinari che sono resi "intelligenti" e producono molti dati.

>What should we be taking into consideration when designing an IoT architecture?

### Scale
The scale of typical IT networks is very smaller than the scale of IoT endpoints.
IPv4 address space has reached exhaustion and is unable to meet IoT’s scalability requirements. **Scale can be met only by using IPv6**.

### Security
I ==dispositivi IoT==, soprattutto quelli connessi a reti di sensori wireless (WSN), sono spesso **esposti fisicamente e vulnerabili ad attacchi**. I modelli tradizionali di sicurezza IT non sono sempre efficaci in questo contesto, anche perché l’hardware, il software e i protocolli variano molto tra un dispositivo e l’altro. Inoltre, le risorse limitate di molti dispositivi rendono difficile adottare soluzioni di sicurezza avanzate come crittografia complessa o firewall. ==Per garantire la protezione==, **ogni nodo IoT deve contribuire alla strategia di sicurezza generale, supportando almeno l’autenticazione del dispositivo e la crittografia del collegamento**.

### Constrained devices and networks
La maggior parte dei ==sensori IoT== è progettata per svolgere un compito specifico, ed essendo piccoli ed economici, **dispongono di risorse limitate in termini di potenza, CPU e memoria**. Trasmettono dati solo quando necessario, e operano spesso in ambienti estesi e non controllati, dove la rete può essere instabile e supportare solo basse velocità di trasmissione. Questo li distingue nettamente dalle reti IT tradizionali, che invece si basano su connessioni veloci e dispositivi con capacità di calcolo elevate.

### Data
In IoT, ==data== **enables business to deliver new IoT services that enhance the user experience and reduce costs**.
- Most IoT generated data is unstructured.
- When all the data is combined, it can be difficult to manage and analyse it.
- Data analytics capabilities need to be distributed throughout the IoT network, from the edge to the cloud. 


### Risorse di calcolo e di rete nell'IoT
Le ==risorse di calcolo e di rete nell'IoT== sono molto diverse rispetto agli ambienti IT, poiché **i dispositivi vengono distribuiti in contesti operativi (OT) molto vari**. **La scelta del tipo di dispositivo da utilizzare è cruciale**: ad esempio, i termometri possono essere impiegati sia vicino alle fornaci di un'acciaieria sia per monitorare la catena del freddo. Inoltre, i dispositivi possono trovarsi in ambienti con livelli di umidità molto diversi, sott'acqua, oppure essere esposti a vibrazioni continue o improvvise.

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
- The frequency of a movement may also vary, from **occasional** to **permanent**.

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
- ==Mesh topology== are more **reliable** (affidabili), since they have **redundant links** and the **failure of one link does not necessarily disconnect the network**.
- Nevertheless, keeping more connections influences the power consumption of the devices.
- **Topologies depend also on the transmission range of the devices** (trivially, two devices are connected by a link in a topology only if they are within the transmission range of one another)
- **In remote areas when devices can possibly be very far apart from each other, it might be necessary to leverage** satellite ==communication==.

#### Network layer - Gateways 
Data collected from a smart object may need to be forwarded to a central station (i.e., a server, a data center, or more generally the cloud) where data is processed.
- The station is often far from the smart object, and requires an Internet connection.
- Many small IoT devices do not support the full TCP/IP stack, i.e., they cannot access the internet directly (when they do, they form a peer-to-peer network).
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
The ==application and analytics layer== **provides the requested services to IoT users**.
- It interprets data using software applications. Applications may monitor, control, and provide reports based on the analysis of the data.
- Data driven decision making.

### Applications and Analytics Layer - Applications
Once data coming from different sensors is transmitted to a central station through the network via a gateway, applications that running on top of the central station, analyse the data.
- IoT applications are very diverse depending on the considered IoT system
-  From an architectural standpoint, we can classify IoT applications into two main types:

**Analytics Application**
==Collects data from multiple smart objects, processes it and displays the resulting information==. 
>The display can be about any aspect of the IoT system, e.g., historical reports, statistics, trend, individual system states. The application processes the data to convey a view of the network.

**Control application**
==Controls the behaviour of the smart objects, allowing to control complex aspects of an IoT system with a logic that cannot be programmed inside a single IoT device==. The program is too complex to fit into the local system or requires data from other objects.E.g., pressure sensor connected to a pump. The control application increases the pump speed when
the sensor senses a drop in pressure.


----

### Applications and Analytics Layer - Analytics
==Analytics== è un termine generico che descrive l'elaborazione delle informazioni per **dare un senso ai dati raccolti**. In IoT, una possibile classificazione della funzione di analisi è la seguente:

**Data Analytics**
==Elaborazione dei dati raccolti da oggetti intelligenti e combinazione di tali dati per fornire una vista intelligente correlata al sistema IoT==. L'analisi dei dati può anche **monitorare** il sistema IoT

```ad-example

Ad esempio, temperatura, pressione, vento, umidità e livelli di luce raccolti da migliaia di sensori possono essere combinati e quindi elaborati per determinare la probabilità di una tempesta e il suo possibile percorso, tramite il coinvolgimento di modelli di algoritmi complessi. L'analisi dei dati può anche monitorare il sistema IoT stesso, ad esempio, un robot in una fabbrica può segnalare dati sui propri movimenti per monitorarne il degrado.

```

**Network Analytics**
Network Analytics ==elabora informazioni sulla connettività del sistema IoT==.
**La perdita o il degrado della connettività comporta la perdita di dati dai sensori e può talvolta avere effetti drammatici** (ad esempio, veicoli autonomi, fabbriche).



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
L=='edge computing== è **un'architettura distribuita in cui i dati del client vengono elaborati** **direttamente sul dispositivo** (o molto vicino alla sorgente dei dati). Avviene su dispositivi **embedded**, **sensori intelligenti**, **gateway** IoT locali per fornire l'elaborazione iniziale e il filtraggio di tutti i dati inviati continuamente dai sensori.

>I dati non viaggiano attraverso Internet, ma vengono trasmessi dai sensori utilizzando protocolli IoT.

```ad-example
title: **Esempio**
Un sensore industriale che analizza i dati di vibrazione di una macchina e decide se fermarla per evitare guasti, **senza connettersi a Internet**.

```

### Cloud Computing
Il ==cloud computing== si riferisce all'elaborazione e archiviazione **remota**, su server potenti accessibili via Internet. Permette la  fornitura di risorse di elaborazione on-demand, server fisici o virtuali, archiviazione dati, capacità di rete ed altro, tramite Internet con prezzi a consumo.

Le risorse vengono assegnate e riassegnate dinamicamente tra più utenti e vengono aumentate o diminuite in risposta alle esigenze dell'utente.
I data center cloud sono collegati a Internet con cavi in ​​fibra ottica ad altissima velocità e capacità.

### Fog Computing
Un **livello intermedio** tra Edge e Cloud, che distribuisce l'elaborazione su nodi locali (es. server in una LAN o router avanzati). A seconda dell'applicazione IoT, il fog computing può fornire più risorse di potenza e capacità di archiviazione rispetto ai dispositivi edge con costi inferiori rispetto alle risorse cloud.

**Dove avviene?** In piccoli data center locali, router intelligenti, micro-cloud aziendali.

```ad-important
title: Difference Edge vs Fog
- **Edge** = Elaborazione sul singolo dispositivo.
- **Fog**: Elaborazione in un nodo locale che serve più dispositivi Edge.

```

```ad-example
title: Global Example
1. **Edge**: Ogni turbina analizza i propri dati di vibrazione per evitare guasti immediati.
    
2. **Fog**: Un server locale raccoglie dati da tutte le turbine per ottimizzare l'energia prodotta.
    
3. **Cloud**: I dati aggregati di tutto il parco vengono usati per previsioni di manutenzione globale.

```

![[11.png]]

### “X as a Service” XaaS
Cloud computing allows businesses to deploy and run their applications on cloud servers.
- Users can access the services via requests to the Cloud hosting the application.
- XaaS “anything as a service”: delivery of solutions, application, products, tools and technologies as services, which exist on some Cloud platform.

### IaaS/PaaS/SaaS
![[24q.png]]
![[25q.png]]

----

## Example of optimization for task offloading on the fog

![[2Semester/IOT/Images/12.png]]
![[14.png]]
![[15.png]]

This kind of problem are called: **Integer Linear Programming Problem**