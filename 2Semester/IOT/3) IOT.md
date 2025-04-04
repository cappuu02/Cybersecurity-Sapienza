## IoT Devices: Sensors and Actuators (PDF3)

The document introduces the topic of **Internet of Things (IoT) devices**, focusing particularly on **sensors and actuators**. Initially, some **fundamental physical concepts** are defined to understand how these devices operate.

### Fundamental Physical Concepts

- **Force (F)** is a physical quantity that can change the velocity of an object, altering its state of rest or motion. It is measured in **Newton (N)**, according to Newton’s second law: $$ N = kg \cdot \frac{m}{s^2} $$ - **Energy (E)** represents the capacity to perform work, meaning the ability to exert a force that causes an object to move. It is measured in **Joules (J)**, **kilowatt-hours (kWh)**, **calories**, and other units. One joule is equivalent to the work done when a force of one newton moves an object one meter in the direction of the force. A kilowatt-hour indicates the energy supplied by one kilowatt of power over one hour. - **Power (P)** expresses the amount of energy transferred or converted per unit of time. It is measured in **Watts (W)**, where one watt corresponds to one joule per second: $$ W = \frac{J}{s} $$
- **Electric potential** indicates the energy required to move a unit charge from one point to another in an electric field. It can be interpreted as the difference in potential energy per unit charge between two points. It is measured in **Volts (V)** and is comparable to the pressure pushing water through a pipe. - **Electric current (I)** represents the flow of charged particles (e.g., electrons) through a conductor or space. Its intensity is measured in **Amperes (A)**, which indicates the amount of charge passing through a point in the circuit per second: $$ 1A = 1C/s $$ where **C** is the Coulomb. - Batteries store energy through an electrochemical process, expressed in **Ampere-hours (Ah)**. The relationship between energy, voltage, current, and time is: $$ J = V \times A \times s $$ - **Electrical resistance (R)** measures a material’s opposition to the passage of electric current. It is expressed in **Ohms (Ω)** and follows Ohm’s law: $$ R = \frac{V}{I} $$
### Sensors

Sensors are devices that **detect changes in environmental conditions or the state of another device/system and transmit this information**. Ideally, sensors should be sensitive only to the property being measured and should not interfere with the environment in which they operate. Sensors vary in **purpose, cost, and resolution**.

- **Resolution** is the smallest change a sensor can detect in the measured quantity. Higher-resolution sensors provide more precise and detailed measurements.
- Sensors are **transducers**, meaning they convert variations in a physical quantity (e.g., pressure, brightness) into variations in another physical quantity (e.g., voltage, position), essentially translating physical signals into electrical signals.

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

# Generic sensing application
In IoT systems, sensors are used for measuring certain quantities in an
environments. The measurement will correspond to a certain action.

![[IOT/IMAGES/18.png]]
![[IOT/IMAGES/19.png]]

# Ideal Sensor
- low noise
- high accuracy
![[IOT/IMAGES/20.png]]

>No ideal sensor exists tho

# Sensitivity
![[IOT/IMAGES/21.png]]

# Non-linearity
![[22.png]]

## Specifying non-linearity
All the errors seen in the previous slide cause non linearity.
In the specs of the sensor, the manufacturer can specify the parabolic model, or, more likely. Specify the best fit line or the line passing through the end points of the curve

>Offset is usually specified too

![[23.png]]

# Span/Range
Manufacturers usually tell the span or the operating range of their devices, i.e., for
what values of the measurand (e.g., pressure), you get a certain sensitivity. Out of that range, you should not expect the declared sensitivity.

![[24.png]]

# Mechanical sensors - oscillatory motion (1)
![[25.png]]

We are modelling how a sensor reacts to changes in the environment.
- The force F represents the variation in the environment (e.g., temperature, pressure etc).
- The Damping coefficient is the sensor’s internal resistance to change in the environment.
- The stiffness is the sensitivity of the sensor’s to such variations.

# Mechanical sensors - oscillatory motion (2)
![[26.png]]

# Mechanical sensors - oscillatory motion (3)
![[27.png]]

# Bandwidth of a sensor
The bandwidth of a sensor, also referred to “frequency response”, is a measure of the
ability of the sensor to perceive and respond to changes in the measurand. The bandwidth is the range between the highest and the lowest frequency limits that the sensor can sense.

![[30.png]]
![[31.png]]
# Actuators

## **Actuators Overview**
- Actuators are components that enable movement in a system.
- They receive control signals and respond with physical motion.
- They interact with sensors, which detect environmental changes (e.g., temperature, humidity).
- Example: A humidity sensor detects dryness → actuator turns on a watering system.

## **Types of Motion**
- **Linear Actuators**: Move in a straight line.
- **Rotary Actuators**: Generate circular motion.
- **Combination**: Some systems use both types for complex movements.

## **Types of Actuators by Energy Source**

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



