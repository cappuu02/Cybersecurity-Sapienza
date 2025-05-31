# Motivation - IoT Environments
- Distribute a bunch of nodes in some environment  
- Need to collect data, monitor  
- No reliable wireless infrastructure  
- They need to cooperate and work together to achieve tasks  

![[5k.png|300]]

# Mesh Networking
```ad-abstract
title: Definition

==Mesh networking== consists in managing connections between networking elements in a dynamic way to forward data  Dynamically self-organise and self-configure. 
```

We use distributed algorithms that need to solve key challenges:  
  - Addressing and identifying nodes  
  - Routing across multiple hops  
# Addressing

## Hardware Addresses
Interface/node comes with a built-in address/key from factory (e.g., MAC address)  
- **Benefit**: No address assign protocol needed  
- **Downside**: Addresses might be too long, harder to route on addresses  

![[6k.png]]

## Geographic Addressing
We add an Addresses based on location!
- Addresses are assigned depending on the location of the devices (geographical, not topological)  
- Define a coordinate system and assign addresses (2D or 3D) to nodes, e.g., using GPS  
**Benefit**: No address assignment protocol needed  
**Downside**: Long addresses in small areas (many decimals) or address collisions  

![[7k.png]]


## Hierarchical Addressing 
==Idea==: Imporre un albero in cima alla nostra topologia e limitare gli indirizzi di conseguenza.
- Selezionare un nodo come radice dell'albero (solitamente affidabile, alimentato e cablato)
- Assegnare un insieme di indirizzi alla radice
- La radice mantiene un indirizzo e assegna il resto ai suoi figli

![[8k.png]]

Uses a simple distributed protocol to do so, simply each node allocates a bunch of addresses for their children.

**Benefit**: Easier routing on addresses  
**Downside**: Richiede un'organizzazione ad albero. Se molti nuovi nodi si uniscono alla rete, non è consigliabile riassegnare gli indirizzi. È meglio prevedere lo scenario peggiore per la pre-allocazione, ma ciò richiede una certa conoscenza preventiva dei futuri modelli di arrivo.


![[9k.png|400]]


### Zigbee’s Distributed Addressing Scheme 
This is a ==Distributed addressing scheme with hierarchical paradigm== which assigns each node a unique 16-bit address and makes the following assumptions: 
  - Tree has maximum depth $L$  
  - Max children per parent: $C$  
  - Max forwarding (router) nodes per parent: $R$ where $R \leq C$  
- Address of the $n$-th router child at level $d+1$:  
  $A_{r,n}^{d+1} = A_{par} + S(d) \cdot (n - 1) + 1$  
- Address of the $l$-th non-router child at level $d+1$:  
  $A_{e,l}^{d+1} = A_{par} + S(d) \cdot R + l$  
- $S(d)$ indica **quanti indirizzi servono** per coprire **tutti i nodi nel sottoalbero** di un router al livello $d$, incluso il router stesso.


$$S(d) =\begin{cases} 0 \hspace{0.5cm} R=0 \\ 1 + C(L - d - 1) \hspace{0.5cm} R=1 \\  CR^{L - d - 1} - 1 - C + R \hspace{0.5cm} R > 1   \end{cases}$$  

![[10k.png]]

## Stochastic Addressing
È un metodo **casuale** per assegnare gli indirizzi ai nodi della rete.
- Ogni nuovo nodo, quando si unisce alla rete, **sceglie un numero a caso** come indirizzo (ad esempio un numero a 16 bit).
- **Non esiste una struttura ad albero**, né una gerarchia tra nodi.

```ad-danger
title: Problem
Poiché l’indirizzo è scelto a caso, **due nodi potrebbero scegliere lo stesso indirizzo**. Questo è un conflitto.

```

```ad-success
title: Solution
Per risolverlo:
1. Il nodo appena connesso **trasmette il suo indirizzo scelto** alla rete.
2. Se **qualcuno ha già quell’indirizzo**, risponde con un messaggio di conflitto.
3. Il nuovo nodo **ripete la scelta** finché trova un indirizzo non in uso

```


![[11k.png]]




# Mesh Routing
Approcci chiave:
1) "Dovremmo avere percorsi sempre disponibili a tutti, in ogni momento" ==routing proattivo==.
- migliore per ambienti fissi/statici, comunicazioni frequenti.
- tempo di acquisizione dei percorsi inferiore.
- richiede maggiore overhead di controllo, memoria e potenza.
1) "Dovremmo creare percorsi solo quando ne abbiamo bisogno" - ==routing reattivo==.
- migliore per ambienti dinamici, comunicazioni rare.
- tempo di acquisizione dei percorsi superiore.
- richiede minore overhead di controllo, memoria e potenza.
## Link State Routing 
È un tipo di algoritmo di routing in cui **ogni nodo costruisce una mappa completa della rete** (chiamata **topology database**) e calcola il percorso più breve verso ogni altro nodo.

- **Scoperta dei vicini**
    - Ogni nodo scopre chi sono i suoi vicini diretti usando un protocollo tipo **"hello"**.
    - Esempio: il nodo A scopre che è collegato a B e C.
- **Link State Advertisement (LSA)**:
    - Ogni nodo invia un messaggio (LSA) con le **informazioni sui suoi link** ai vicini (es. “sono il nodo A e sono connesso a B e C”).
    - Queste informazioni vengono **floodate** nella rete → tutti i nodi ricevono la stessa informazione.
- **Costruzione della topologia**:
    - Ogni nodo raccoglie tutte le LSA e costruisce la **mappa completa della rete**.
- **Calcolo dei percorsi**:
    - Una volta che un nodo ha la mappa, **esegue l’algoritmo di Dijkstra** per calcolare il **percorso più breve** verso ogni altro nodo (ogni nodo crea la sua routing table)
- **Aggiornamenti dinamici**:
    - Se un nodo si unisce o si guasta, il processo ricomincia → si inviano nuove LSA e si aggiornano le mappe.

![[12k.png]]

```ad-important
Per evitare il flooding dei pacchetti LSA infiniti potrebbe potenzialmente propagarsi all’infinito, ma viene **controllato tramite un numero di sequenza** (ogni LSA ha un sequence number).

- Se ha già visto un LSA con quel sequence number $\Rightarrow$ scarta
- Se è nuovo $\Rightarrow$ scartalo

```

```ad-question
title: Nodo nuovo nella rete?
Il nuovo nodo **non ha la topologia della rete**, quindi:
1. Manda un messaggio ai vicini (che conosce tramite il protocollo hello)
2. I vicini gli inviano un **dump (copia)** della loro **topology database**
3. Il nuovo nodo **invia un LSA** che annuncia la sua **esistenza e i suoi link**
4. Il processo di flooding si riattiva solo per questi nuovi aggiornamenti

```


## Distance Vector Routing 
Ogni router conosce i collegamenti con i propri vicini (non diffonde queste informazioni all'intera rete). Ogni router ha un "percorso più breve" provvisorio verso ogni altro router (ad esempio, il nodo A conosce il costo per raggiungere il router B). I nodi scambiano queste informazioni sul vettore di distanza con i router vicini. I router esaminano l'insieme delle opzioni offerte dai vicini e selezionano la migliore (ovvero quella con il costo/peso minore). Processo iterativo, converge all'insieme dei percorsi più brevi.

![[13k.png]]

```ad-danger
title: Problem
Slow convergence to new best path after link failures

```

### Convergence
![[14k.png]]
![[15k.png]]


## Mesh Routing
Il **Mesh Routing** è una tecnica utilizzata nelle reti wireless in cui **i nodi collaborano tra loro per trasmettere i dati**, anche quando non esiste un collegamento diretto tra sorgente e destinazione. A differenza dei protocolli tradizionali come **Link State** o **Distance Vector**, che non sono pensati per reti a bassa potenza o con topologie variabili, il mesh routing è progettato per essere più efficiente in termini di consumo energetico e uso di banda.

In una rete wireless, quando un nodo trasmette un pacchetto, **tutti i vicini lo ricevono automaticamente** grazie alla natura “broadcast” del segnale radio. Questo significa che non è necessario inviare un messaggio a ogni vicino singolarmente, risparmiando così energia e risorse. Inoltre, in molti scenari non è necessario conoscere la rotta verso ogni singolo nodo: è sufficiente sapere come inoltrare i pacchetti nella direzione corretta.

Le reti mesh hanno alcune caratteristiche fondamentali:
- Ogni nodo può agire come **relay**, cioè può ricevere e ritrasmettere pacchetti per conto di altri.
- Il traffico può viaggiare su più **hop** (passaggi intermedi), anche se la sorgente e la destinazione non sono direttamente connesse.
- La rete è **auto-organizzante**: i nodi scoprono i vicini automaticamente e si collegano senza configurazione manuale.
- È anche **auto-configurante**, perché adatta i percorsi dinamicamente se un nodo viene aggiunto, si sposta o si guasta.
- Questo comportamento migliora la **tolleranza ai guasti** e riduce il bisogno di interventi di gestione.

### Mesh Networking Algorithms

#### Optimised Link State Routing (OLSR)
Si tratta di un ==protocollo di routing link-state distribuito e proattivo== che **riduce al minimo gli aggiornamenti non necessari**. I nodi trasmettono messaggi a tutti i vicini e ogni nodo seleziona vicini specifici, chiamati ==multipoint relay (MPR)==, per l'inoltro dei pacchetti. Gli MPR vengono scelti in base alla loro capacità di raggiungere i vicini a due hop, garantendo una copertura completa. Solo gli MPR trasmettono gli aggiornamenti di routing, mentre gli altri nodi rimangono in silenzio.

1. Ogni nodo scopre i suoi vicini a due salti in modo proattivo inviando pacchetti "hello" con un elenco del set di vicini del mittente

![[16k.png]]

![[17k.png]]

![[18k.png]]
![[19k.png]]![[20k.png]]

2. Ogni nodo seleziona un **sottoinsieme dei suoi vicini a 1 hop per inoltrare gli stati dei suoi collegamenti (Multipoint Relay, MPR)**. Ogni nodo conserva informazioni sull'insieme dei vicini che lo hanno selezionato come MPR.

![[21k.png]]

```ad-important

The ==goal== is to select the smallest possible set of one-hop neighbors $N1(H)$ of node $H$ that can cover all two-hop neighbors $N2(H)$.
```
 The procedure works as follows:

##### ==MPR Selection Algorithm==
Procedura euristica utilizzata in OLSR per selezionare i Multipoint Relay (MPR).

**Procedure**
Innanzitutto, includi tutti i vicini a un salto che costituiscono l'unica connessione con nodi isolati a due salti (ovvero, nodi in $N2(H)$ raggiungibili tramite un solo nodo in N1(H)). Quindi, seleziona iterativamente il vicino a un salto rimanente che copre il maggior numero di nodi a due salti scoperti fino a raggiungere tutti i nodi in $N2(H)$.

>Questa euristica fornisce una soluzione efficiente, poiché trovare il set di relè multipunto (MPR) ottimale è un problema NP-completo.


![[194K.png]]
![[195K.png]]

##### forwarding
Una volta che **ogni nodo ha selezionato il proprio insieme di MPR (Multipoint Relay)**, si procede come in un normale protocollo **link-state**: i nodi raccolgono informazioni sulla topologia e costruiscono un **database topologico**.

A questo punto, ogni nodo:
- esegue l’algoritmo di **Dijkstra** per calcolare il **percorso più breve verso ogni destinazione** nella rete;
- memorizza solo **il prossimo nodo (next-hop)** del percorso ottimale, sufficiente per l'inoltro dei pacchetti;
- utilizza **i propri MPR** per inoltrare i pacchetti in modo efficiente, riducendo al minimo i messaggi inutili.

> In questo modo, l’instradamento resta proattivo (le rotte sono calcolate in anticipo), ma molto più leggero rispetto ai protocolli link-state classici.

> ==Risparmio Energetico==: Solo un piccolo sottoinsieme della rete deve restare attivo in ogni momento.

> Svantaggio: I nodi MPR sono molto più attivi (devono ricevere e inoltrare i messaggi di routing), quindi **consumano batteria più velocemente** rispetto agli altri nodi.

##### downsides
Mantiene i percorsi verso tutti i nodi, in ogni momento
- utile se la maggior parte dei nodi deve comunicare tra loro
- causa sovraccarico se la comunicazione è più scarsa/rara
- rivela l'intera topologia a tutti i nodi (negativo per la privacy)

```ad-question

Cosa succederebbe se creassimo percorsi "su richiesta" proprio quando ne abbiamo bisogno? Avremmo un routing reattivo!
```

#### Dynamic Source Routing (DSR) 
==DSR== è un **protocollo di routing reattivo** utilizzato in reti wireless ad hoc.  
"Reattivo" significa che **non costruisce tabelle di routing all'avvio della rete**, ma **scopre le rotte solo quando servono**, ovvero quando un nodo deve inviare dei dati.

Quando un nodo sorgente vuole inviare dati a un nodo di destinazione **di cui non conosce la rotta**, avvia un processo di **route discovery**, seguendo questi passaggi:

1. **Flooding del Route Request (RREQ)**  
    Il nodo sorgente invia un messaggio RREQ in broadcast nella rete.  
    Ogni nodo che riceve questo messaggio:
    - **controlla se è il destinatario**; se sì, risponde;
    - altrimenti, **aggiunge il proprio identificatore (ID)** al messaggio e lo ritrasmette.
2. **Route Reply (RREP)**  
    Quando il messaggio RREQ arriva al nodo di destinazione:
    - questo genera un messaggio RREP;
    - il RREP torna indietro lungo **il percorso inverso** (tracciato grazie agli ID nel RREQ);
    - il messaggio RREP arriva infine al nodo sorgente.
3. **Trasmissione dati**  
    Il nodo sorgente ora conosce l’intero percorso fino alla destinazione, che è chiamato **"source route"**.  
    A questo punto:
    - il percorso viene **inserito direttamente nell’header del pacchetto dati**;
    - ogni nodo intermedio **non ha bisogno di calcolare nulla**, ma semplicemente **segue le istruzioni** del source route.

![[23k.png]]


**Funzionamento**

**STEP 1**
![[196K.png]]
![[197K.png]]
![[198K.png]]
![[199K.png]]
![[200K.png]]
![[210K.png]]
![[202K.png]]


**STEP 2**: Il nodo di destinazione risponde con RREP, che non è flooded ma piuttosto unicast per efficienza lungo il percorso inverso contenuto nell'RREQ ricevuto

![[203K.png]]

**STEP 3**: Source can send data through the RTE
![[205K.png]]


Per **migliorare l'efficienza**, possiamo implementare il ==caching==, ovvero la **sorgente memorizzerà nella cache il percorso per un certo periodo di tempo**, nel caso in cui desideri inviare altri pacchetti alla stessa destinazione in seguito.

I **nodi intermedi** e gli altri nodi che ascoltano RREQ e RREP **possono anche memorizzare nella cache** ciò che vedono. Le voci vengono eliminate dopo il timeout (parametro configurabile).


**I messaggi di errore di percorso vengono inviati in modo reattivo quando viene rilevato un errore.**
![[206K.png]]
![[207K.png]]
![[208K.png]]


Il concetto di **source routing** esiste da decenni e, in realtà, è supportato a livello tecnico anche dall’**IPv4**: esistono campi nell’header del pacchetto che permettono di specificare il percorso da seguire.

Tuttavia, **il source routing è oggi deprecato** in Internet perché presenta diversi limiti, anche se può risultare utile in contesti come le applicazioni IoT, dove le reti sono più piccole e con nodi a basso consumo.

#### Ad Hoc On-demand Distance Vector (AODV)
AODV è un **protocollo di routing reattivo**. È progettato per reti **dinamiche** dove i collegamenti cambiano frequentemente.

**Come Funziona?**
Quando un nodo ha bisogno di inviare dati a un altro nodo, ma **non conosce il percorso**, attiva un processo chiamato ==Route Discovery==, che si svolge così:

1. **Invio di RREQ (Route Request)**  
    Il nodo sorgente **invia un messaggio RREQ in broadcast** nella rete.  
    Ogni nodo che lo riceve:
    - crea una **voce nella sua tabella di routing** che punta **indietro verso il mittente** (cioè verso il nodo che gli ha trasmesso il messaggio);
    - inoltra il RREQ se non lo ha già visto prima.
2. **Arrivo al nodo di destinazione**
    - Quando il RREQ arriva alla destinazione (o a un nodo che ha una rotta valida per la destinazione), questo risponde con un **RREP (Route Reply)**.
    - Il RREP segue il **cammino inverso** tracciato dai messaggi RREQ.
3. **Invio dei dati**
    - A questo punto, il nodo sorgente **conosce la rotta** e inizia a inviare i pacchetti.

>I nodi che **fanno parte di un percorso attivo** (cioè tra sorgente e destinazione) **mantengono informazioni sul percorso** nella loro tabella di routing.

![[24k.png]]

**STEP 1**: La sorgente invia RREQ per trovare un percorso verso la destinazione. I nodi intermedi mantengono tabelle, create come nel distance-vector, ovvero punti di ingresso che rimandano alla sorgente del messaggio.
![[209K.png]]
![[211K.png]]
![[212K.png]]
![[213K.png]]
![[214K.png]]
![[215K.png]]

![[216K.png]]

**STEP 2**: La destinazione aggiorna il suo numero di sequenza e risponde attraverso il percorso delle voci della tabella di routing create dall'RREQ. A differenza del classico distance-vector, in cui tutti i nodi hanno tutti i percorsi da tutti a tutti, la destinazione risponde in modalità unicast.
![[217K.png]]
![[218K.png]]


In AODV, **i nodi possono tentare una riparazione locale** del percorso, inviando un nuovo RREQ per trovare un'alternativa invece di propagare subito un messaggio di errore (RERR). Questo evita l'invalidazione immediata della rotta, ma **riparazioni ripetute possono allungare progressivamente il percorso**.

Ogni nodo mantiene nella sua tabella di routing **il numero di sequenza più aggiornato** della destinazione, che viene aggiornato quando riceve messaggi RREQ, RREP o RERR.  
Ogni nodo gestisce **il proprio numero di sequenza**, incrementandolo:

1. Prima di avviare una discovery (RREQ);
2. Prima di inviare un RREP.

Questo meccanismo garantisce **l’assenza di loop** nei percorsi.

#### Hierarchical/Tree Routing
Ogni nodo conosce un sottointervallo di indirizzi per ogni nodo figlio ed è responsabile di quel blocco di indirizzi. Un nodo che riceve un pacchetto da inviare ad altri nodi deve solo verificare se l'indirizzo si trova nei sottointervalli dei suoi nodi figlio:
- in caso affermativo, lo invia al nodo figlio appropriato;
- in caso negativo, lo invia al nodo padre.

> Routing semplice.

![[25k.png]]

#### Geographic Routing 
Utilizza **indirizzo geografico:** utilizza le informazioni sulla posizione geografica per avanzare verso la destinazione.

La sorgente invia messaggi verso la posizione geografica della destinazione. Ogni nodo tiene traccia della posizione geografica dei vicini, in modo da sapere quale vicino percorre la maggior parte del percorso verso la destinazione.

More complex than you might think
- can get stuck in dead ends (“voids”, i.e., a node has no neighbours towards the destination)
- can get stuck in loops (two neighbours think each other makes the most progress to the destination)

##### Greedy Forwarding
![[219K.png]]
![[220K.png]]
![[221K.png]]
![[222K.png]]
![[223K.png]]
![[224K.png]]


##### Different distance metrics for Greedy Forwarding
![[26k.png]]

```ad-missing
title: Problem
![[Pasted image 20250525112401.png]]

```

```ad-success
title: Solution
Invia lungo il primo bordo che vedi partendo dal bordo da cui hai ricevuto il pacchetto in senso antiorario
![[Pasted image 20250525112413.png]]

```

#### Delay-Tolerant networking: Gossip Algorithms 
==Idea==: c'è una nuova voce, la gente inizia a spettegolare al riguardo. Inizialmente si spettegola molto e la voce si diffonde molto rapidamente, poi la gente si annoia e la menziona più raramente. Se un nodo ha dati da inviare, attende un tempo casuale, sceglie una direzione di destinazione casuale e trasmette ai nodi in quella direzione. Questi nodi applicano lo stesso meccanismo.

![[227K.png]]

![[228K.png]]

![[229K.png]]

![[230K.png]]

Ogni nodo attende un tempo casuale dopo aver ricevuto i dati, sceglie target casuali e li invia.
​​Alcuni nodi potrebbero ricevere gli stessi dati più volte e decidere di inviarli nuovamente.
![[231K.png]]
![[232K.png]]
![[233K.png]]
![[234K.png]]
![[235K.png]]

...

![[236K.png]]


- Se tutti i guasti dei collegamenti sono transitori e ricorrenti, il messaggio alla fine raggiungerà la destinazione.
- Algoritmo molto semplice, facile da implementare, probabilmente raggiungerà anche tutti gli altri nodi (ottimo per la trasmissione).
- Propagazione lenta.
- Variante: Indiscrezione
- Quando i nodi ricevono un nuovo aggiornamento, si diffonde una "indiscrezione" (la probabilità di invio dei pacchetti è maggiore)
- Quando un nodo riceve il pacchetto più volte, lo propaga meno frequentemente.

## Back to our Motivation
```ad-important

Nel contesto IoT, la connettività continua non può essere data per scontata. Reti intermittenti, ambienti inaffidabili e dispositivi a basso consumo rendono difficile mantenere comunicazioni stabili, richiedendo protocolli adatti a gestire disconnessioni frequenti e ritardi nella trasmissione dei dati.
```

