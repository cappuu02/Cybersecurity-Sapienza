
# Introduction
Embedded systems are computerised systems that are purpose-built for their applications (highly specialised in one application and few tasks around the application). While general purpose computers’ main function is computation, that is not the same for IoT devices (e.g., smart cars, smart refrigerators, smart light bulbs).
IoT devices are embedded systems with the additional feature that they can talk through the internet.

# Architecture
![[36a.png]]

## Microcontrollers and Microprocessors
**Microcontrollers (MCU)** are the brain of an embedded system and responsible for orchestrating all the operations. They are slower than microprocessor with less memory and fewer features.

>A typical microcontroller contains a CPU, interrupts, timer/counter, memory and other peripherals, all in a single integrated circui

**Microprocessors** are mainly general-purpose systems (e.g., computers), whereas microcontrollers are designed to perform very few tasks

![[37a.png]]

## Microcontrollers & Systems on Chip (SoCs)

**Microcontrollers**:  are the core processors executing code, have memory and on-chip peripherals. 

**System-on-Chip (SoC)**: combines a microcontroller core with more complex subsystems/ peripherals (e.g., digital signal processors) and can contain multiple CPUs.

>SoCs are more powerful, intended for higher complexity and consume more power.

## CPU (Microprocessor)
![[38a.png]]

CPU has three main components: 
- **Arithmetic central unit (ALU)**: performs arithmetic and logical operations 
- **Registers**: provide operands to ALU and store results of ALU operations 
- **Control Unit**: controls the overall operations and communicates with ALU and registers

CPU are characterised by their **instruction set architecture (ISA)**, a set of basic operations that CPU can perform:
- Complex Instruction set Computing (CISC): Has a very large instruction sets, more complex hardware, more compact software, takes more cycles per instruction. (Example: AMD and Intel x86, mainly used on computers, workstations and server)
- Reduced Instruction Set Computing (RISC): Has small instruction sets, simpler hardware, more complicated software, one instruction per cycle. (Example: Atmel AVR, PIC and ARM)

CPU need to communicate with the other peripherals (such as memory and I/O). This is done through the system bus, which includes:
- Data bus (for carrying information)
	- bi-directional connection
	- width of the data bus determines how much data can be transferred in one cycle
	- carries the actual data being transferred between the processor, memory, and peripherals.
- Address bus, for determining where the information should be sent
	- carries information about the memory address or I/O device where the data should be read from or written to
	- uni-directional communication
	- The width of the address bus determines the maximum addressable memory space
- Control bus, for controlling the operation
	- carries commands to coordinate the operations of the processor, memory and peripherals
	- Some common control signals include: Read, Write, Clock, Interrupt, ...


**Inter-Integrated Circuit (I2C) bus**
The master sets the clock rate and sends it through the serial clock line (SCL). The data (SDATA) line is used for both the microcontroller to send data to external chips and viceversa (half-duplex transmission mode). It offers a direct and efficient way for multiple devices to communicate over a shared bus, without the need for individual communication lines per device. Accommodates a broad spectrum of devices, ranging from sensors to memory chips.

**Universal Asynchronous Receiver-Transmitter (UART) bus**
It is a bus connecting the CPU with UART ports/peripherals. 
- No clock line. One line for transmitting and one for receiving messages. 
- Allows for asynchronous communication, very versatile. •
- Transmission is serial, bit by bit.

![[39a.png]]

**Serial Peripheral Interface (SPI)**
Allows for synchronous, full duplex master-slave-based communication. Has a clock line, two lines for transmission (master starts the communication). 
There are $n$ chip select lines, one for each connected peripheral. 
The master selects the slave by pulling the corresponding CS line low (0 V).

## Memory
In addition to classical external memories (RAM and ROM), microcontrollers are also equipped with:

**EEPROM (Electrically Erasable Programmable Read-Only Memory)**
is a user-alterable read-only memory that can be erased and reprogrammed. Store information in memory cells that use floating gate transistors to store and retrieve data.

**NVRAM (non-volatile RAM)**
Works as a SRAM when powered (i.e., retains its contents as long as electrical power is applied to the chip), and uses a battery to retain data when power is off.

>NVRAM + Flash memory

**Flash memory** has a similar structure as EEPROMs but data is erased in blocks (256 bytes to few KB).

![[40a.png]]

## Porte I/O parallele  
Le porte I/O parallele trasferiscono 8 bit simultaneamente su otto fili distinti. Utilizzano più fili/pin paralleli per accedere a più segnali contemporaneamente, garantendo un'elevata velocità di trasmissione. Per evitare diafonia e errori, tutti i flussi di bit devono trasferire dati alla stessa velocità, condizione difficile da rispettare. Per questo motivo, le comunicazioni parallele sono adatte per collegamenti brevi, come quelli utilizzati per monitor, stampanti e memorie.

## Porte I/O seriali  
Le porte I/O seriali utilizzano un singolo filo per trasferire un unico flusso di dati. Questo approccio elimina la diafonia e gli errori dovuti a differenze di velocità, permettendo comunicazioni su lunghe distanze. Il componente UART (Universal Asynchronous Receiver/Transmitter) è ampiamente utilizzato nei sistemi embedded, sebbene sia stato sostituito da porte più veloci come Ethernet e USB nei computer. La velocità di trasmissione seriale è inferiore rispetto a quella parallela.

## Convertitore Analogico-Digitale (ADC)  
L'ADC converte segnali analogici continui in segnali digitali discreti. Viene utilizzato per leggere l'output analogico di sensori, come il suono catturato da un microfono, la luce in una fotocamera digitale, o tensioni e correnti. Le prestazioni di un ADC sono definite dalla sua larghezza di banda (frequenza di campionamento) e dal rapporto segnale-rumore (SNR), che dipende da risoluzione, linearità e accuratezza nella corrispondenza tra livelli di quantizzazione e segnale analogico originale.

## Convertitore Digitale-Analogico (DAC)  
Il DAC esegue l'operazione inversa dell'ADC, convertendo segnali digitali in analogici. Viene impiegato per controllare dispositivi analogici, come altoparlanti e motori, trasformando numeri binari in grandezze fisiche (es. tensione). Secondo il teorema di Nyquist-Shannon, la conversione tra segnali analogici e digitali è quasi perfetta se la frequenza di campionamento è almeno il doppio della larghezza di banda del segnale.

## Microcontrollori CortexM  
I microcontrollori CortexM utilizzano architetture a 32 bit e si dividono in diverse versioni: dalle più semplici (M0, M0+, M1) alle più potenti (M4, M7, M33). Le tre principali sottofamiglie sono ARMv6-M (M0, M0+, M1), ARMv7-M (M3) e ARMv7E-M (M4, M7). La serie CortexM definisce il set di istruzioni e le funzionalità di base comuni a tutti i microcontrollori.

## Funzionalità opzionali dei CortexM  
L'unità di protezione della memoria (MPU) protegge il firmware limitando l'accesso alla memoria del codice non attendibile (modalità utente), mentre il codice di sistema opera in modalità kernel. Il timer SysTick e altre periferiche sono mappate in memoria come blocchi accessibili all'interno dell'architettura del processore.

## Esempio di MCU: Atmel SAM4L  
Basato su core Cortex-M4, offre 128-512 KB di memoria flash, 32-64 KB di RAM e opera fino a 48 MHz. Include 4 bus USART, 4 bus I2C, supporto USB, ADC con 3-15 canali e 15 canali DMA per trasferimenti diretti tra memoria e periferiche senza coinvolgere la CPU. Consuma 1.5-3 µA in sleep mode e 90 µA/MHz in attività.

## Esempio di SoC: Nordic nRF51  
Integra un core Cortex-M0 con transceiver BLE, 128-256 KB di flash e 16-32 KB di RAM, operando a 16 MHz. Il consumo energetico è particolarmente elevato durante la trasmissione e ricezione radio (16 mA TX, 13.4 mA RX), rendendo cruciale l'ottimizzazione dell'uso della radio per risparmiare energia.

## Mappa della memoria CortexM  
Nei microcontrollori CortexM, le periferiche sono mappate in memoria secondo un layout predefinito:  

| Indirizzo      | Area        |
|----------------|-------------|
| 0x00000000     | Codice      |
| 0x20000000     | SRAM        |
| 0x40000000     | Periferiche |
| 0xA0000000     | RAM         |
| 0xE0000000     | Dispositivi |

## Registri principali  
La CPU ARM include 16 registri:  

| Registro | Funzione                  |
|----------|---------------------------|
| r0       | Valore di ritorno         |
| r1-r12   | Argomenti delle funzioni  |
| r13      | Puntatore allo stack      |
| r14      | Registro di collegamento  |
| r15      | Contatore del programma   |

## Modalità di esecuzione  
I microcontrollori operano in due modalità:  
- **Utente**: Codice con privilegi limitati per stabilità  
- **Kernel**: Accesso completo all'hardware  

Il passaggio a kernel mode avviene durante:  
1. Chiamate di sistema  
2. Interrupt  
3. Eccezioni  
4. Cambi di contesto  

## Registri di controllo  
Oltre ai registri principali, esistono registri speciali:  
- **APSR**: Stato del processore  
- **IPSR**: Numero dell'interrupt corrente  
- **EPSR**: Stato di esecuzione  

Questi elementi sono fondamentali per la gestione degli interrupt e del controllo del processore.

## Controller degli interrupt e stati
Il controller degli interrupt è una periferica che aiuta il processore a gestire gli interrupt. Le sorgenti di interrupt possono essere diverse periferiche come ADC, timer, GPIO e UART. Gli interrupt presentano tre stati principali: inattivo (quando le condizioni non sono soddisfatte), pending (condizioni soddisfatte ma ISR non ancora chiamato) e attivo (quando l'ISR sta gestendo l'interrupt).

## Tabella dei vettori di interrupt (IVT)
La IVT contiene gli indirizzi delle routine di servizio degli interrupt (ISR) e associa ciascuna ISR alle richieste di interrupt provenienti da diverse sorgenti. Tipicamente memorizzata nella flash memory, la IVT varia a seconda del produttore del microcontrollore. Gli interrupt hanno priorità per determinare quale gestire per primo quando sono presenti più interrupt pending.

## Tipi di interrupt
Esistono due categorie principali di interrupt:
- **Hardware**: Generati da dispositivi esterni in modo asincrono (es. un sensore di temperatura che segnala superamento soglia)
- **Software**: Attivati dal microcontrollore quando vengono eseguite istruzioni speciali o si verificano condizioni particolari (es. divisione per zero)

## Costi nei sistemi embedded
Nella progettazione di sistemi embedded IoT, i due costi principali da considerare sono energia e denaro. I sistemi più potenti consumano più energia, mentre MCU con maggiori funzionalità hanno costi più elevati. È fondamentale scegliere il microcontrollore minimale che soddisfi i requisiti dell'applicazione e ottimizzare il codice per ridurre consumi e costi.

## Esempi di costi
Ecco un confronto tra diversi microcontrollori:

| Modello         | Famiglia    | Flash  | RAM   | Prezzo | Caratteristiche          |
|-----------------|-------------|--------|-------|--------|--------------------------|
| ATSAMD20E15A    | Cortex-M0+  | 16kB   | 2kB   | $1.37  |                          |
| ATSAMD21E16B    | Cortex-M0+  | 64kB   | 8kB   | $1.70  | LIN, USB                 |
| NRF51422        | Cortex-M0   | 256kB  | 32kB  | $2.44  | BLE                      |
| ATSAM4EBEA      | Cortex-M4   | 512kB  | 128kB | $7.62  | CAN, Ethernet, USB, IrDA |

In generale, all'aumentare di memoria flash e RAM aumenta anche il costo.

## Bilancio energetico
I sistemi embedded alimentati a batteria richiedono un'attenta gestione dell'energia per massimizzare l'autonomia. Calcolare il bilancio energetico permette di valutare compromessi progettuali, come dimensionamento batteria e ottimizzazioni software per ridurre i cicli di ricarica.

# High level energy consumption

Roughly speaking, the energy consumed by a device is the energy consumed while they are sleeping and the energy consumed while they are active:  

$E = P_s t_s + P_a t_a$  

Where:  
- $(E)$: energy  
- $(P_s)$: power in sleep mode  
- $(P_a)$: power in active mode  
- $(t_s)$: time in sleep mode  
- $(t_a)$: time in active mode  

In practice, it is more complicated, because there could be many terms and many different active modes (radio on/off, processor speed, etc).  

## Minimizing energy consumption
To minimise **sleep energy**, put microcontroller into lowest possible state - in the previous example we only saw “sleep” mode, but microcontrollers have different many low-power states and power-saving features. - the state the microcontroller is in has complex implications to software 

To _minimise_ **active energy**, minimise time peripherals and MCU are active - perform operations in parallel to minimise active time - cluster/batch operations to minimise transition times (e.g., instead of sending one packet every second you can send 10 packets every ten seconds). - minimize clock rate.

## Sleep States: SAM4L running modes
![[41a.png]]

## Active State: Parallelism
Parallelism is one technique to enhance efficiency in active mode
![[42a.png]]

## Active state: Batching
If your system has very high transition costs (probably because it takes long to go from sleep to active mode), you can improve the efficiency of your system by batching a whole bunch of operations to amortise transition costs between them.

![[43a.png]]

# Energy Harvesting

## Electrical Power sources
![[44a.png]]

## Battery-powered IoT sensors
Molte applicazioni IoT utilizzano sensori alimentati a batteria, come nel monitoraggio ambientale, vulcanico, strutturale e nel tracciamento veicoli. Tuttavia, la capacità della batteria è limitata e batterie più grandi risultano costose e ingombranti, spesso impraticabili. Inoltre, i sensori vengono spesso installati in luoghi difficili da raggiungere, rendendo la sostituzione delle batterie onerosa e complessa.

Per affrontare questo problema, si possono adottare processori e moduli radio a basso consumo, sebbene ciò riduca la capacità computazionale e la velocità di trasmissione. Un'altra soluzione è l'uso di protocolli di comunicazione a basso consumo, che migliorano l’efficienza energetica ma non eliminano del tutto la limitazione della batteria.

## Another solution: Energy Harvesting
**Energy Harvesting** consente di raccogliere energia dall'ambiente o da altre fonti, come il calore corporeo o il movimento. Esistono due principali architetture di raccolta:
- **Harvest-use**: l'energia raccolta alimenta direttamente il sensore. Se l'energia è insufficiente, il nodo si disattiva.
- **Harvest-store-use**: l'energia raccolta viene immagazzinata in un componente di storage e utilizzata per alimentare il sensore in modo più continuo.

Le fonti di energia variano in base a controllabilità, prevedibilità e intensità. Le fonti **controllabili** forniscono energia su richiesta, come il movimento del polso, mentre quelle **non controllabili**, come l’energia solare, dipendono dall’ambiente. Alcune fonti, come il sole e il vento, sono **prevedibili** con una certa precisione. Inoltre, l’intensità dell’energia varia: il sole e il vento offrono maggiore potenza rispetto alla respirazione o alla pressione sanguigna.

## Ambient Energy Harvesting
L’**energia solare** è la fonte di energia più abbondante sulla Terra. I **generatori termoelettrici** sfruttano la giunzione di due materiali diversi per convertire il calore in elettricità in presenza di un gradiente termico. L’**energia eolica** viene raccolta tramite turbine, che trasformano l’energia cinetica del vento in elettricità. L’**energia da vibrazioni meccaniche** può essere convertita con dispositivi piezoelettrici, che generano elettricità quando sottoposti a deformazione.

