import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import MidiScript from "@/webmidi/midiScript";


const CustomGeometryParticles = (props) => {
  const { count } = props;

  // This reference gives us direct access to our points
  const points = useRef();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 1;
    
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    

    return positions;
  }, [count]);

  const test = MidiScript()

  

  useFrame((state) => {
    const { clock } = state;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;


      points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 10) * 0.01;
      points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01;
    }

    points.current.geometry.attributes.position.needsUpdate = true;

    if (test.type == 176){
      points.current.rotation.x = test.velocity
      points.current.rotation.y = test.velocity
    }
  });

  const control = useControls('Particles', {
    rotx: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001 },
    roty: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
    rotz: { value: 0, min: 0, max: Math.PI * 2, step: 0.00001  },
    visible:{value: true},
    color: {value: '#5786F5'},
    
  })

  return (
    <points visible={control.visible} rotation={[control.rotx, control.roty, control.rotz]} ref={points}>
      <bufferGeometry >
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.012} color={control.color} sizeAttenuation depthWrite={false} />
    </points>
  );
};

const Particle = () => {
  return (
    <mesh >
      <CustomGeometryParticles count={2000} />
    </mesh>
  );
};


export default Particle;