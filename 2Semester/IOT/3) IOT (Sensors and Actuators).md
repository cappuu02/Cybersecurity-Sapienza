
The document introduces the topic of **Internet of Things (IoT) devices**, focusing particularly on **sensors and actuators**. Initially, some **fundamental physical concepts** are defined to understand how these devices operate.

## Physics Concepts
### Forza (F)
- **Definizione**: Grandezza fisica che modifica la velocità di un oggetto, cambiandone lo stato di quiete o moto.
- **Unità di misura**: Newton (N)
- **Formula**:  
  $$ N = kg \cdot \frac{m}{s^2} $$  
  (Seconda legge di Newton)
### Energia (E)
- **Definizione**: Capacità di compiere lavoro (applicare una forza che sposta un oggetto).
- **Unità di misura**:
  - Joule (J)
  - Chilowattora (kWh)
  - Calorie
- **Equivalenza**:  
  $$ 1J = 1N \cdot 1m $$  
  (Lavoro compiuto da 1N per spostare un oggetto di 1m)

### Potenza (P)
- **Definizione**: Energia trasferita o convertita per unità di tempo.
- **Unità di misura**: Watt (W)
- **Formula**:  
  $$ W = \frac{J}{s} $$  
  (1 Watt = 1 Joule al secondo)

### Potenziale Elettrico
- **Definizione**: Energia necessaria per spostare una carica unitaria in un campo elettrico.
- **Unità di misura**: Volt (V)
- **Interpretazione**: Differenza di energia potenziale per unità di carica tra due punti.

### Corrente Elettrica (I)
- **Definizione**: Flusso di particelle cariche (es. elettroni) attraverso un conduttore.
- **Unità di misura**: Ampere (A)
- **Formula**:  
  $$ 1A = 1C/s $$  
  (1 Ampere = 1 Coulomb al secondo)

### Resistenza Elettrica (R)
- **Definizione**: Opposizione di un materiale al passaggio di corrente.
- **Unità di misura**: Ohm (Ω)
- **Legge di Ohm**:  
  $$ R = \frac{V}{I} $$  
  (Resistenza = Tensione / Corrente)
## Sensors
I sensori sono dispositivi che **rilevano cambiamenti nelle condizioni ambientali o nello stato di un altro dispositivo/sistema e trasmettono queste informazioni**. Idealmente, i sensori dovrebbero essere sensibili solo alla proprietà misurata e non dovrebbero interferire con l'ambiente in cui operano. I sensori variano in **scopo, costo e risoluzione**.

- La **risoluzione** è la più piccola variazione che un sensore può rilevare nella quantità misurata. I sensori ad alta risoluzione forniscono misurazioni più precise e dettagliate.
- I sensori sono **trasduttori**, il che significa che convertono le variazioni in una quantità fisica (ad esempio, pressione, luminosità) in variazioni in un'altra quantità fisica (ad esempio, tensione, posizione), traducendo essenzialmente i segnali fisici in segnali elettrici.

### Types of Sensors

- **Color sensors** measure the visible light spectrum and identify object colors, functioning like a single-pixel camera. Applications include medical test reading, agriculture, and ambient light detection.

![[IOT/IMAGES/16.png]]

 
- **Hall effect sensors** detect differences in electromagnetic fields and perceive object proximity by measuring voltage changes in a magnetic field. Used in robotics, speed detectors, and current sensors.

![[IOT/IMAGES/17.png]]
 
- **Microphones** convert sound into electrical signals for audio recording, voice recognition, wake-word detection, and echolocation.
    
- **Accelerometers** measure the physical acceleration of an object. They contain a test mass dampened on a spring; acceleration compresses the spring (Newton’s third law), and the compression level measures the applied force (acceleration). Applications include mobility monitoring, human health tracking, and fall detection.
    
- **Gyroscopes** contain a fast-spinning wheel or a circulating light beam to detect object orientation. Often paired with accelerometers for motion detection in gaming controllers and used for precise navigation in submarines, aircraft, missiles, and spacecraft.
    
- **Gas sensors** detect specific gases and measure their presence and concentration in the air. Gases interact with an electrochemical electrode, producing a reaction that converts the chemical change into an electrical signal. They can detect carbon monoxide, methane, and alcohol.
    
- **Passive infrared (PIR) sensors** convert infrared signals into electrical signals, enabling the detection of objects emitting infrared radiation in the dark (e.g., humans). Applications include motion detection, security alarms, remote control communication, and robotic maze navigation.
    
- **Humidity sensors** measure environmental humidity levels. They contain two conductive plates with a non-conductive film between them; moisture on the film creates a voltage difference between the plates. Applications include agricultural humidity detection and microclimate monitoring.
    
- **Flow sensors and anemometers**: Flow sensors measure gas and liquid flow rates in pipes, used in industrial systems, agriculture, water/gas meters, and sustainable construction. Anemometers measure gas velocity in open air (e.g., wind speed) and are used in climate monitoring and architecture.
    
- **Tactile sensors** detect and record physical touch. Since the human body mainly consists of water, it is a good conductor; tactile sensors detect voltage differences caused by touch. They also work with other conductive materials and are used in touchscreens and fingerprint authentication.
    
- **Photoresistors** measure light intensity and are useful in smart homes to adjust lighting based on external light conditions.
    
- **Load cells** measure applied force/weight. They have a metal body attached to a foil strain gauge; when stress is applied to a stationary object, the resulting deformation generates a tension detected by the strain gauge. Applications include weighing scales, automatic door-opening systems, and impact measurements.
    
- **Temperature sensors** measure ambient temperature and are used in smart homes (heating control), healthcare, circuit temperature monitoring, and agriculture.
    
- **Emerging sensors**: The document also mentions new sensor technologies such as electronic noses (for detecting chemical concentrations in odors), advanced tactile sensors (for determining texture, stiffness, friction coefficient, and thermal conductivity), blood gas/glucose sensors, and brainwave sensors.

### Generic sensing application
In IoT systems, sensors are used for measuring certain quantities in an environments. The measurement will correspond to a certain action.

![[IOT/IMAGES/18.png]]
![[IOT/IMAGES/19.png]]

### Ideal Sensor
- low noise (poco rumore e distorsione nei dati)
- high accuracy (alta accuratezza)
- sensivity only to input of interest (non dobbiamo farci condizionare da altri dati/fattori)
![[IOT/IMAGES/20.png]]
### Sensitivity
![[IOT/IMAGES/21.png]]

```ad-example
**Scenario Ideale (Ipotetico)**:
- **Bilancia vuota (0 kg)** → Output: **0V**.
    
- **Bilancia con 10 kg** → Output: **5V**.
    
- **Bilancia con 20 kg** → Output: **10V**.

In questo scenario abbiamo una retta perfettamente dritta che denota una situazione ideale!

**Sensore Reale (Con Offset e Non Linearità)**
- **Bilancia vuota (0 kg)** → Output: **1V** (_offset_).
    
- **Bilancia con 10 kg** → Output: **4.5V** (invece di 5V).
    
- **Bilancia con 20 kg** → Output: **8V** (invece di 10V)
In questo scenario abbiamo una retta spezzare e dunque non proporzionale.
```

### Non-linearity
La **non linearità** è una caratteristica comune nei sensori reali. Idealmene, ci aspetteremmo che a un certo input (es. pressione `P`) corrisponda sempre lo stesso output (es. tensione `V`). Tuttavia, diversi effetti possono introdurre errori, che fanno sì che la risposta del sensore **non segua una linea retta** o un comportamento perfettamente prevedibile.

![[45a.png]]

**Hysteresis**: L’output del sensore dipende **non solo dall’input corrente**, ma anche dalla **storia** del sistema.
**Repeatability:** Quando **ripeti** la stessa misura con **lo stesso input**, ottieni risultati **leggermente diversi**.
**Drift**: Anche se l’input fisico rimane **costante**, l’output **cambia nel tempo**.

> Questi effetti sono spesso causati da **disturbi ambientali**, come temperatura, campi elettromagnetici, vibrazioni, ecc.
### Specifying non-linearity
Quando il produttore crea un sensore, può anche specificare **quanto si discosta dalla linearità** ideale.

Nelle specifiche, si può indicare la **migliore approssimazione** tra curva reale e curva ideale:
- **Best fit**: Linea che si adatta meglio a tutti i punti della curva.
- **End-point fit**: Linea che collega solo i punti estremi della curva (inizio e fine).

![[23.png]]

>L’**offset** è lo **scostamento iniziale** tra il valore reale di output e quello atteso quando l’input è a zero.
### Span/Range
I produttori di solito indicano l'intervallo o il range operativo dei loro dispositivi, ovvero per quali valori del misurando (ad esempio, la pressione) si ottiene una certa sensibilità. Al di fuori di tale intervallo, non ci si dovrebbe aspettare la sensibilità dichiarata.

![[24.png]]

### Mechanical sensors - oscillatory motion (1)
I **sensori meccanici** non rispondono istantaneamente, ma hanno una **dinamica** che può essere modellata come un **oscillatore smorzato**.
- Il sistema è composto da:
    - **Massa (m)** → reagisce all’accelerazione (inerzia).
    - **Smorzatore (b)** → rappresenta l’**attrito**, riduce il movimento.
    - **Molla (k)** → oppone resistenza elastica al movimento (rigidità).
Il comportamento del sensore è simile a un circuito elettrico:
- **Massa ↔ Induttore**  (componente che immagazzina energia in un campo elettrico)
- **Smorzatore ↔ Resistenza** (implementa resistenza in un circuito elettrico)
- **Molla ↔ Condensatore** (immagazzina energia elettrica accumulando cariche su due superfici ravvicinate)
### Mechanical sensors - oscillatory motion (2)
![[26.png]]
### Mechanical sensors - oscillatory motion (3)
![[27.png]]

### Bandwidth of a sensor
La larghezza di banda di un sensore, detta anche "risposta in frequenza", è una misura della capacità del sensore di percepire e rispondere ai cambiamenti nel misurando. La larghezza di banda è l'intervallo tra i limiti di frequenza più alti e più bassi che il sensore può percepire.

![[30.png]]
![[31.png]]
## Actuators

### **Actuators Overview**
- Gli attuatori sono componenti che consentono il movimento in un sistema.
- Ricevono segnali di controllo e rispondono con un movimento fisico.
- Interagiscono con sensori, che rilevano i cambiamenti ambientali (ad esempio, temperatura, umidità).

```ad-example
A humidity sensor detects dryness → actuator turns on a watering system.

```
### **Types of Motion**
- **Linear Actuators**: Move in a straight line.
- **Rotary Actuators**: Generate circular motion.
- **Combination**: Some systems use both types for complex movements.

### **Types of Actuators by Energy Source**
1. **Hydraulic Actuators**
    - Use liquid to move a piston in a cylinder.
    - Produce strong forces due to incompressibility of liquid.
    - Require auxiliary components, are prone to leaks, and are costly.
2. **Pneumatic Actuators**
    - Use compressed air to move a piston.
    - Suitable for high-temperature environments where gases are safer than liquids.
    - Cheaper and have quick response times but can lose pressure.
3. **Electric Actuators**
    - Use motors to convert electrical energy into mechanical movement.
4. **Thermal Actuators**
    - Use temperature changes to trigger movement in thermally sensitive materials.
5. **Magnetic Actuators**
    - Use electromagnetic forces (Joule Effect) to produce motion.

These actuators form the foundation of automated systems in IoT, allowing devices to respond dynamically to environmental changes.



