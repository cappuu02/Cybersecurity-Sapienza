# Uniform Reliable Broadcast (URB) - Spiegazione dell'Algoritmo

Questo algoritmo implementa un *Uniform Reliable Broadcast (URB)* utilizzando:
- *Best Effort Broadcast (BEB)* per la propagazione dei messaggi.
- *Perfect Failure Detector (P)* per rilevare con accuratezza i processi falliti.

---

## Obiettivo

L'algoritmo garantisce le seguenti proprietÃ :
1. *Uniform Agreement*: Se un processo corretto consegna un messaggio, tutti i processi corretti consegnano lo stesso messaggio.
2. *No Duplication*: Ogni messaggio viene consegnato al massimo una volta.
3. *Validity*: Se un processo corretto trasmette un messaggio, lo consegnerÃ .
4. *Uniform Integrity*: Solo messaggi trasmessi vengono consegnati.

---

## Struttura

### Variabili Locali:
- delivered: Insieme dei messaggi consegnati.
- pending: Insieme dei messaggi ancora in attesa di consegna.
- correct: Insieme dei processi attivi (non falliti).
- ack[m]: Insieme dei processi che hanno confermato la ricezione del messaggio $$m$$.

---

## Funzionamento

### 1. Inizializzazione
plaintext
upon event âŸ¨ urb, Init âŸ© do
    delivered := âˆ…;
    pending := âˆ…;
    correct := Î ;
    forall m do ack[m] := âˆ…;

- Tutti gli insiemi sono inizializzati a vuoti.
- correct Ã¨ inizializzato all'insieme di tutti i processi $$\Pi$$.
- ack[m] Ã¨ inizializzato per ogni messaggio $$m$$ come vuoto.

---

### 2. Trasmissione di un messaggio (urb.Broadcast)
plaintext
upon event âŸ¨ urb, Broadcast | m âŸ© do
    pending := pending âˆª {(self, m)};
    trigger âŸ¨ beb, Broadcast | [DATA, self, m] âŸ©;

- Quando un processo vuole inviare un messaggio $$m$$:
  - Aggiunge $$(self, m)$$ all'insieme pending.
  - Usa il servizio BEB per trasmettere $$m$$ come [DATA, self, m].

---

### 3. Ricezione di un messaggio (beb.Deliver)
plaintext
upon event âŸ¨ beb, Deliver | p, [DATA, s, m] âŸ© do
    ack[m] := ack[m] âˆª {p};
    if (s, m) âˆ‰ pending then
        pending := pending âˆª {(s, m)};
        trigger âŸ¨ beb, Broadcast | [DATA, s, m] âŸ©;

- Quando un processo riceve un messaggio $$m$$ da $$p$$ tramite BEB:
  1. Aggiunge $$p$$ all'insieme di acknowledgment di $$m$$, ack[m].
  2. Se il messaggio non Ã¨ giÃ  in pending, lo aggiunge e lo ritrasmette tramite BEB (meccanismo di propagazione).

---

### 4. Consegna di un messaggio (urb.Deliver)
plaintext
function candeliver(m) returns Boolean is
    return (correct âŠ† ack[m]);

upon exists (s, m) âˆˆ pending such that candeliver(m) âˆ§ m âˆ‰ delivered do
    delivered := delivered âˆª {m};
    trigger âŸ¨ urb, Deliver | s, m âŸ©;

- Un messaggio $$m$$ viene consegnato solo se tutti i processi attivi (in correct) hanno confermato la ricezione di $$m$$.
  - Questo Ã¨ verificato dalla funzione candeliver(m), che restituisce true se $$correct \subseteq ack[m]$$.
- Una volta soddisfatta la condizione, $$m$$ Ã¨ aggiunto a delivered e consegnato tramite urb.Deliver.

---

### 5. Rilevamento di un fallimento (P.Crash)
plaintext
upon event âŸ¨ P, Crash | p âŸ© do
    correct := correct \ {p};

- Quando un processo $$p$$ viene rilevato come fallito, viene rimosso dall'insieme correct.

---

## Diagramma del Flusso
- *URB_Broadcast* innesca *BEB_Broadcast* per propagare il messaggio.
- *BEB_Deliver* aggiorna gli acknowledgment e puÃ² ritrasmettere il messaggio.
- Una volta che tutti i processi attivi hanno confermato il messaggio, esso Ã¨ consegnato tramite *URB_Deliver*.

---

## ProprietÃ  Garantite
1. *Uniform Agreement*: Tutti i processi corretti consegnano lo stesso messaggio.
2. *Failure Handling*: Utilizzando un Perfect Failure Detector, il sistema puÃ² gestire guasti accuratamente.
3. *Efficienza*: La ritrasmissione avviene solo quando necessaria, evitando overhead inutili.

---

## Riassunto
L'algoritmo utilizza acknowledgment e failure detection per garantire l'uniformitÃ  del Reliable Broadcast. Il meccanismo Ã¨ robusto contro i fallimenti e assicura che ogni messaggio raggiunga tutti i processi corretti.