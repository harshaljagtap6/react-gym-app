import React from "react";
import ExcersiceCard from "./ExcersiceCard";
import SectionWrapper from "./SectionWrapper";
export default function Workout(props) {
    const { workout } = props;
    return (
        <SectionWrapper id="workout" header={"Welcome to"} title={["The", "DANGER", "ZONE"]}>
            <div className="flex flex-col gap-4">
                {workout.map((excercise, idx) => {
                    return <ExcersiceCard excercise={excercise} key={idx} i={idx} />;
                })}
            </div>
        </SectionWrapper>
    );
}
