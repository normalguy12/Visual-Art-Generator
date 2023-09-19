import { Button, Stack } from "@chakra-ui/react";
import { useCharacterAnimations } from "./animation";
import store from "@/redux/store";

const Interface = () => {
  
  const animations = store.getState().animationGet.value

  return (
    <Stack position={{ bottom: 50, right: 20 }}>
      <Stack>
        {animations.map((animation, index) => (
          <Button
            key={animation}
            variant={index === animationIndex ? "filled" : "light"}
            onClick={() => setAnimationIndex(index)}
          >
            {animation}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Interface;
