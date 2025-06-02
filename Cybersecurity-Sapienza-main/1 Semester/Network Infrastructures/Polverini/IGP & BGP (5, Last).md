The routing problem concerns all types of networks:
- In a packet network based on the IP protocol, the routers needs to decide where to forward IP packets.
- In an Ethernet based Local Area Network (LAN) the Ethernet switches need to decide where to forward the Ethernet frames.
- In a circuit based traditional telephone network the Central Offices need to decide where to forward a call directed toward a given telephone number

To solve the routing problem usually we need both:
- **Routing Algorithms**: they allow the nodes to take the routing decisions based on the information that they have available.
- **Routing Protocols**: They allow the nodes to exchange the information needed to run the algorithms and take the decision.

The routing protocols define the rules for the exchange of routing information among the routers in a network. Routing protocols dynamically distribute network topology information needed to choose the paths (and update the information when some change happens).

>A routing protocol is typically associated to a routing algorithm that actually selects the «shortest» path on the basis of the known network topology information.

## Routing vs Forwarding
- **Routing**: the operations, protocols and algorithms related to taking the decisions of where to forward the packets.
- **Forwarding**: the process of forwarding a packet, usually the decision has already been take.


![[Pasted image 20241209145141.png]]
Il nodo della rete nel primo dominio (?) non sa quali sono i cammini di un altro dominio e la sua struttura. Abbiamo sostanzialmente due problemi di routing su due differenti livelli:

## Level 1-2: BGP and IGP
Finding a sequence of Autonomous systems that packet should through to go from source to destination. But thanks to this, we find an Interior gateway problem that is more deep and go from the ingress to the egress point of domains.

![[WhatsApp Image 2024-12-09 at 15.14.25.jpeg]]

Schematicamente possiamo suddividere dunque:
![[Pasted image 20241209145825.png|500]]
![[Pasted image 20241209145813.png|500]]

In this last image we can distinguish two types of technology of distributed routing in the IGP:
## IGP
### Link State 
Topology information is flooded within the routing domain
Best end-to-end paths are computed locally at each router and determine next-hops
Based on minimizing some notion of distance
Works only if policy is shared and uniform

Thanks to this, all node can create map of topology (internal information). Every node use Dijkstra to find shortest path.

![[Pasted image 20241209151318.png]]

```ad-example
Examples: OSPF, IS-IS
```
### Vectoring
Each router knows little about network topology.
Only best next-hops are chosen by each router for each destination network.
Best end-to-end paths result from composition of all next-hop choices.
Does not require any notion of distance.
Does not require uniform policies at all routers.

![[Pasted image 20241212163725.png]]

```ad-example
Examples: RIP, BGP

```
## BGP
Il **protocollo BGP (Protocollo di Gateway Esterno, acronimo di Border Gateway Protocol)** è il protocollo comunemente utilizzato per la gestione della rotta tra domini, e presenta notevoli vulnerabilità di sicurezza.

Anche se il BGP è relativamente semplice dal punto di vista della sua progettazione del protocollo, la sua configurazione è complessa e gli errori possono avere conseguenze estreme, poiché possono influire su tutta rete globale. Il BGP funziona sulla base del concetto di Sistemi Autonomi (AS), con ogni AS che rappresenta una grande rete o un gruppo di reti sotto una politica di routing
unitaria.

### AS (Autonomous Systems)
```ad-abstract
title: Definition
An Autonomous System (AS) is a collection of IP networks and routers under the control of a single organization that presents a common routing policy to the Internet. AS are identified by a unique Autonomous System Number (ASN).

```

![[Network Infrastructures/images/119.png]]
### Interaction between EGP and IGP Protocols
For an end-to-end route to be established, BGP (an EGP) and Interior Gateway Protocols (IGPs) must cooperate. The router nodes of an AS typically interact with both EGP and IGP protocols. These router nodes inform other internal nodes within the AS, through IGP, that the packet should be forwarded to the corresponding router node. This router node, in turn, sends the packet to the next AS. This interaction ensures efficient routing across multiple AS.

### BGP for interdomain routing
![[Network Infrastructures/images/120.png]]
**BGP Session Initiation**
To ==enable communication between two AS, a BGP session must be established==. 
In this session, the AS are referred to as peers. BGP sessions are point-to-point connections between routers, usually established over a TCP connection. During the session, the peers exchange routing information, including active routes.

![[Network Infrastructures/images/121.png]]
Ad esempio, nel caso di un dominio stub (AS1), che è un dominio foglia che trasporta solo dati destinati o generati da se stesso o dai suoi clienti, tenterà di stabilire una sessione BGP con AS2 (un dominio di transito). AS1 invia ad AS2 i prefissi che conosce (in questo caso, solo due), mentre AS2 può rispondere con un percorso predefinito, impostandosi come percorso predefinito per AS1. La connessione viene continuamente aggiornata con messaggi di aggiornamento del percorso.

![[Network Infrastructures/images/122.png]]

### Four types of BGP message
- **Open**: Establish a peering session
- **Keep Alive**: Handshake at regular intervals
- **Notification**: Shuts down a peering session
- **Update**: Announcing new routes or withdrawing previously announced route

>Announcement = prefix + attributes values

## AS Path Attribute
![[Network Infrastructures/images/123.png]]Come mostrato nell'immagine, il percorso verso alcuni prefissi viene inviato direttamente dal proprietario del prefisso agli altri AS. Ogni AS pubblicizza il miglior percorso che conosce per uno specifico prefisso e possono essere disponibili più percorsi, come si vede nel caso dell'AS 12654. In generale, viene preferito il percorso con il minor numero di hop AS (cioè il percorso più breve), anche se questo non sempre porta al percorso più ottimale per il viaggio del pacchetto.

### Policy-Base Vs Distance-Based Routing
![[Network Infrastructures/images/124.png]]

1. **Distance-Based Routing**: This policy relies exclusively on the number of **hops** (the number of routers traversed) to choose the shortest path. However, this method ignores commercial relationships between ISPs, which may have peering agreements, transit arrangements, or other restrictions.
    
2. **Policy-Based Routing**: BGP does not simply select the shortest path but follows policies defined by ISPs, which depend on economic agreements and routing preferences. Some paths may be avoided for economic or political reasons.
    

> **Distance-Based Routing** may seem more efficient in terms of hop count, but **Policy-Based Routing** is more realistic in the Internet world, where ISPs establish rules to optimize traffic based on economic and contractual interests.


### Optimizing Path Selection
Quando si seleziona il percorso migliore per raggiungere una destinazione, è generalmente vantaggioso ridurre al minimo il numero di hop AS. Tuttavia, la scelta del percorso più breve non sempre porta a prestazioni ottimali. Infatti, il percorso con meno hop AS può passare attraverso una rete interna non ottimale (dove il SA non ha visibilità o controllo). Inoltre, i fornitori di rete possono limitare alcuni percorsi a causa di accordi o politiche commerciali, il che potrebbe indurre i pacchetti a seguire percorsi più lunghi ma più affidabili. Le decisioni di instradamento BGP sono influenzate dalle relazioni tra gli AS. Ad esempio, il traffico potrebbe essere instradato attraverso un percorso più lento se non esiste un accordo con un altro AS che offre un percorso più veloce.

### Peering
```ad-abstract
title: Definition
Il **peering** è una connessione diretta tra due AS (Autonomous Systems) che consente di scambiare traffico Internet senza passare attraverso altri intermediari (provider di transito). È una "scorciatoia" che ottimizza il flusso di dati.

```

Stabilire una connessione di peering diretta con il AS di destinazione è spesso più efficiente che instradare il traffico attraverso più AS. Questa “scorciatoia” è particolarmente utile per le reti di distribuzione dei contenuti (CDN), che spesso effettuano il peering diretto con i principali fornitori di accesso per ottimizzare la consegna dei contenuti.

![[Network Infrastructures/images/125.png]]

### Exports Routes
![[Network Infrastructures/images/126.png]]
È vietato far trapelare le rotte tra provider e peer a entità che non dovrebbero vederle. Ad esempio, le rotte di un provider non dovrebbero essere pubblicizzate a un peer vicino. Questo problema viene tipicamente risolto utilizzando dei filtri che bloccano le pubblicità di rotte indesiderate in uscita da un particolare AS.

## Route Leak and Privacy Issues
Un **Route Leak** si verifica quando le informazioni di instradamento, che dovrebbero essere disponibili solo a un cliente specifico o a un AS (Sistema Autonomo), vengono condivise accidentalmente o intenzionalmente con altri AS.

Nella figura sopra, solo il cliente direttamente connesso all'AS dovrebbe essere a conoscenza delle modifiche alle rotte. Se altri AS, che non sono coinvolti nell'aggiornamento, vengono a conoscenza di queste informazioni, potrebbero reindirizzare il traffico verso una destinazione errata, violando gli accordi di privacy.

I **Route Leak** possono verificarsi anche accidentalmente a causa di errori da parte di clienti o peer.

![[Network Infrastructures/images/127.png]]

## Tweak tweak tweak
![[Network Infrastructures/images/129.png]]
![[Network Infrastructures/images/130.png]]

## Outbound traffic
![[Network Infrastructures/images/131.png]]
In situazioni in cui sono disponibili più percorsi, è possibile designare un collegamento primario e uno di backup. Il collegamento primario è solitamente preferito perché ha un valore di **Local Preference** più alto (ad esempio, 100, come mostrato nel diagramma). Questo valore garantisce che il collegamento primario venga scelto rispetto a quello di backup, a meno che il collegamento primario non diventi indisponibile.

Quando il collegamento primario fallisce, il collegamento di backup viene utilizzato come soluzione alternativa.

Un'altra tecnica utilizzata per influenzare il traffico in entrata attraverso il collegamento primario è il **AS Path Prepending**. Questo metodo consiste nell'inserire più volte il numero dell'AS negli aggiornamenti BGP per aumentare artificialmente il conteggio dei salti di un determinato percorso, rendendolo meno attraente per altri AS.