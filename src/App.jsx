import { useState } from "react";
import Generator from "./components/Generator";
import Workout from "./components/Workout";
import Hero from "./components/Hero";
import { generateWorkout } from "./utils/functions";

function App() {
    const [workout, setWorkout] = useState(null);
    const [poison, setPoison] = useState("individual");
    const [muscleGroup, setMuscleGroup] = useState([]);
    const [goal, setGoal] = useState("strength_power");

    function updateWorkout() {
        if (muscleGroup.length < 1) {
            return;
        }
        console.log("before passing to function ");
        let newWorkout = generateWorkout({
            muscles: muscleGroup,
            poison,
            goal,
        });
        setWorkout(newWorkout);
        window.location.href = "#workout";
    }

    return (
        <main className="min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base">
            <Hero />
            <Generator
                poison={poison}
                setPoison={setPoison}
                muscleGroup={muscleGroup}
                setMuscleGroup={setMuscleGroup}
                goal={goal}
                setGoal={setGoal}
                updateWorkout={updateWorkout}
            />
            {workout && <Workout workout={workout} setWorkout={setWorkout} />}
        </main>
    );
}

export default App;
