
# Introduction
I ==sistemi embedded== sono sistemi computerizzati costruiti appositamente per un'applicazione (altamente specializzati in un'applicazione e poche attività attorno all'applicazione). Mentre la funzione principale dei computer per uso generale è il calcolo, non è lo stesso per i dispositivi IoT (ad esempio, auto intelligenti, frigoriferi intelligenti, lampadine intelligenti). I dispositivi IoT sono sistemi embedded con la caratteristica aggiuntiva di poter comunicare tramite Internet.

# Architecture
![[36a.png]]

## Microcontrollers and Microprocessors
==Microcontrollers (MCU)== are the **brain of an embedded system** and responsible for orchestrating all the operations. They are **slower than microprocessor** with less memory and fewer features.

>A typical microcontroller contains a CPU, interrupts, timer/counter, memory and other peripherals, all in a single integrated circuit.

==Microprocessors== are mainly general-purpose systems (e.g., computers), whereas microcontrollers are designed to perform very few tasks

![[37a.png]]

## Microcontrollers & Systems on Chip (SoCs)

**Microcontrollers**:  are the core processors executing code, have memory and on-chip peripherals. 

**System-on-Chip (SoC)**: combines a microcontroller core with more complex subsystems/ peripherals (e.g., digital signal processors) and can contain multiple CPUs.

>SoCs are more powerful, intended for higher complexity and consume more power.

## CPU (Microprocessor)
![[38a.png]]

**CPU** has three ==main components==: 
- **Arithmetic central unit (ALU)**: performs arithmetic and logical operations 
- **Registers**: provide operands to ALU and store results of ALU operations 
- **Control Unit**: controls the overall operations (operazioni generali) and communicates with ALU and registers

CPU are characterised by their ==instruction set architecture (ISA)==, a set of basic operations that CPU can perform:
- **Complex Instruction set Computing (CISC)**: Has a very large instruction sets, more complex hardware, more compact software, takes more cycles per instruction. (Example: AMD and Intel x86, mainly used on computers, workstations and server)
- **Reduced Instruction Set Computing (RISC)**: Has small instruction sets, simpler hardware, more complicated software, one instruction per cycle. (Example: Atmel AVR, PIC and ARM)

**CPU need to communicate with the other peripherals** (such as memory and I/O). This is done through the ==system bus==, which includes:
- **Data bus** (for carrying information)
	- bi-directional connection
	- width of the data bus determines how much data can be transferred in one cycle
	- carries the actual data being transferred between the processor, memory, and peripherals.
- **Address bus**, for determining where the information should be sent
	- carries information about the memory address or I/O device where the data should be read from or written to
	- uni-directional communication
	- The width of the address bus determines the maximum addressable memory space
- **Control bus**, for controlling the operation
	- carries commands to coordinate the operations of the processor, memory and peripherals
	- Some common control signals include: Read, Write, Clock, Interrupt, ...

Protocolli di comunicazione seriale usati per trasferire dati tra microcontrollori e periferiche: 

**Bus Inter-Integrated Circuit (I2C)**
![[26q.png]]

**Bus Universal Asynchronous Receiver-Transmitter (UART)**
![[27q.png]]
![[39a.png]]

**Serial Peripheral Interface (SPI)**
![[28q.png]]
## Memory
In addition to classical external memories (RAM and ROM), microcontrollers are also equipped with:

**EEPROM (Electrically Erasable Programmable Read-Only Memory)**
È una memoria di sola lettura modificabile dall'utente, che può essere cancellata e riprogrammata. Memorizza le informazioni in celle di memoria.

**NVRAM (non-volatile RAM)**
Conserva il suo contenuto finché l'alimentazione elettrica è applicata al chip e utilizza una batteria per conservare i dati quando l'alimentazione è interrotta.

>NVRAM + Flash memory

**Flash memory** has a similar structure as EEPROMs but data is erased in blocks (256 bytes to few KB).

![[40a.png]]

## Porte I/O parallele  
Le porte I/O parallele trasferiscono 8 bit simultaneamente su otto fili distinti. Utilizzano più fili/pin paralleli per accedere a più segnali contemporaneamente, garantendo un'elevata velocità di trasmissione. Per evitare diafonia e errori, tutti i flussi di bit devono trasferire dati alla stessa velocità, condizione difficile da rispettare. Per questo motivo, le comunicazioni parallele sono adatte per collegamenti brevi, come quelli utilizzati per monitor, stampanti e memorie.

## Porte I/O seriali  
Le porte I/O seriali utilizzano un singolo filo per trasferire un unico flusso di dati. Questo approccio elimina la diafonia e gli errori dovuti a differenze di velocità, permettendo comunicazioni su lunghe distanze. La velocità di trasmissione seriale è inferiore rispetto a quella parallela.

## Convertitore Analogico-Digitale (ADC)  
==L'ADC converte segnali analogici continui in segnali digitali discreti==. 
Viene utilizzato per leggere l'output analogico di sensori, come il suono catturato da un microfono, la luce in una fotocamera digitale, o tensioni e correnti. **Le prestazioni di un ADC sono definite dalla sua larghezza di banda (frequenza di campionamento) e dal rapporto segnale-rumore (SNR)**, che dipende da risoluzione, linearità e accuratezza nella corrispondenza tra livelli di quantizzazione e segnale analogico originale.

## Convertitore Digitale-Analogico (DAC)  
==Il DAC esegue l'operazione inversa dell'ADC, convertendo segnali digitali in analogici==. Viene impiegato per controllare dispositivi analogici, come altoparlanti e motori, trasformando numeri binari in grandezze fisiche (es. tensione). Secondo il teorema di Nyquist-Shannon, la conversione tra segnali analogici e digitali è quasi perfetta se la frequenza di campionamento è almeno il doppio della larghezza di banda del segnale.

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

----
## Modalità di esecuzione  
I ==microcontrollori== **operano in due modalità**:  
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

Questi ==elementi sono fondamentali per la gestione degli interrupt e del controllo del processore==.
## Controller degli interrupt e stati
Il ==controller degli interrupt== è una **periferica che aiuta il processore a gestire gli interrupt. Le sorgenti di interrupt possono essere diverse periferiche come ADC, timer, GPIO e UART**. Gli interrupt presentano ==tre stati principali==: 
- inattivo (quando le condizioni non sono soddisfatte), 
- pending (condizioni soddisfatte ma ISR non ancora chiamato) 
- attivo (quando l'ISR sta gestendo l'interrupt).

## Tabella dei vettori di interrupt (IVT)
La **IVT (Interrupt Vector Table)** è una tabella che dice alla CPU:  
_"Se arriva un interrupt X, salta all’indirizzo Y dove trovi la routine (ISR) per gestirlo!"_

![[1q.png]]

## Tipi di interrupt
Esistono ==due categorie principali di interrupt==:
- **Hardware**: Generati da dispositivi esterni in modo asincrono (es. un sensore di temperatura che segnala superamento soglia)
- **Software**: Attivati dal microcontrollore quando vengono eseguite istruzioni speciali o si verificano condizioni particolari (es. divisione per zero)

## Costi nei sistemi embedded
Nella ==progettazione di sistemi embedded IoT==, i due ==costi principali== da considerare sono **energia** e **denaro**. I sistemi più potenti consumano più energia, mentre MCU con maggiori funzionalità hanno costi più elevati. È fondamentale scegliere il microcontrollore minimale che soddisfi i requisiti dell'applicazione e ottimizzare il codice per ridurre consumi e costi.

## Bilancio energetico
==I sistemi embedded alimentati a batteria richiedono un'attenta gestione dell'energia per massimizzare l'autonomia==. ==Calcolare il bilancio energetico== permette di valutare compromessi progettuali, come dimensionamento batteria e ottimizzazioni software per ridurre i cicli di ricarica.

# High level energy consumption
l'energia consumata da un dispositivo è l'energia consumata mentre è in modalità di sospensione e l'energia consumata mentre è attivo:

$E = P_s t_s + P_a t_a$  

Where:  
- $(E)$: energy  
- $(P_s)$: power in sleep mode  
- $(P_a)$: power in active mode  
- $(t_s)$: time in sleep mode  
- $(t_a)$: time in active mode  

In practice, it is more complicated, because there could be many terms and many different active modes (radio on/off, processor speed, etc).  

## Minimizing energy consumption
To minimise **sleep energy**, put microcontroller into lowest possible state 

in the previous example we only saw “sleep” mode, but microcontrollers have different many low-power states and power-saving features.

To _minimise_ **active energy**, 
- ridurre al minimo il tempo di attività delle periferiche e della MCU
- eseguire operazioni in parallelo per ridurre al minimo il tempo di attività
- operazioni cluster/batch per ridurre al minimo i tempi di transizione ridurre al minimo la frequenza di clock.

## Sleep States: SAM4L running modes
![[41a.png]]

## Active State: Parallelism
Parallelism is one technique to enhance efficiency in active mode
![[42a.png]]

## Active state: Batching
Se il sistema presenta costi di transizione molto elevati, è possibile migliorarne l'efficienza raggruppando una serie di operazioni per ammortizzare i costi di transizione tra di esse.

![[43a.png]]

# Energy Harvesting

## Electrical Power sources
![[44a.png]]

## Battery-powered IoT sensors
Molte applicazioni IoT usano sensori a batteria per monitoraggio ambientale, strutturale o tracciamento veicoli. Le limitazioni principali sono:  
- **Capacità limitata**: batterie più grandi sono costose e ingombranti  
- **Sostituzione complessa**: spesso installati in luoghi remoti o difficili da raggiungere  
- **Compromessi prestazionali**: soluzioni a basso consumo riducono capacità computazionale e velocità  

**Energy Harvesting**  
Alternativa per ridurre la dipendenza dalle batterie:  
- **Harvest-use**: energia usata immediatamente (sensore si disattiva se insufficiente)  
- **Harvest-store-use**: energia accumulata (supercondensatori/batterie tampone) per uso continuativo  

**Fonti energetiche**  
- **Controllabili**: disponibili su richiesta (es. movimento umano in dispositivi indossabili)  
- **Non controllabili**: dipendono dall'ambiente (sole, vento)  
- **Prevedibili**: modelli previsionali (cicli solari, pattern vento)  
- **Alta intensità**: solare/eolico (miglior rapporto potenza)  

**Tecnologie di raccolta**  
- **Fotovoltaico**: conversione luce solare  
- **Termoelettrico**: gradienti termici → elettricità  
- **Piezoelettrico**: vibrazioni meccaniche → energia  
- **Micro-eolico**: mini turbine per vento a bassa velocità  

**Vantaggi**  
- Autonomia prolungata  
- Riduzione interventi manutenzione  
- Sostenibilità ambientale  

**Sfide**  
- Variabilità ambientale (disponibilità energia intermittente)  
- Efficienza di conversione  
- Costi iniziali di implementazione  
