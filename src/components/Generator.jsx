import React, { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SCHEMES, WORKOUTS } from "../utils/swoldier";
import Button from "./Button";

function Header(props) {
    const { index, title, description } = props;
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
                <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
                    {index}
                </p>
                <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
            </div>
            <p className="text-sm sm:text-base mx-auto">{description}</p>
        </div>
    );
}

export default function Generator(args) {
    const {
        poison,
        setPoison,
        muscleGroup,
        setMuscleGroup,
        setWorkout,
        workout,
        goal,
        setGoal,
        updateWorkout,
    } = args;
    const [toggleDropdown, setToggleDropdown] = useState(false);

    function setToggleDropdownfunc() {
        setToggleDropdown(!toggleDropdown);
        console.log(toggleDropdown);
    }

    function updateMuscleGroup(muscles) {
        // console.log(muscleGroup)
        if (muscleGroup.includes(muscles)) {
            setMuscleGroup(muscleGroup.filter((val) => val !== muscles));
            return;
        }

        if (muscleGroup.length > 2) {
            return;
        }

        if (poison !== "individual") {
            setMuscleGroup([muscles]);
            setToggleDropdown(false);
            return;
        }

        setMuscleGroup([...muscleGroup, muscles]);
        if (muscleGroup.length === 2) {
            setToggleDropdown(false);
        }
    }

    return (
        <SectionWrapper
            id={"generate"}
            header={"generate your workout"}
            title={["It's", "Huge", "'O Clock"]}
        >
            <Header
                index={"01"}
                title={"Pick your poison"}
                description={"Select the workout you wish to endure."}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.keys(WORKOUTS).map((type, typeIndex) => {
                    return (
                        <button
                            onClick={() => {
                                setPoison(type);
                                setMuscleGroup([]);
                            }}
                            className={
                                "bg-slate-950 border  duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                                (type === poison
                                    ? " border-blue-600"
                                    : " border-blue-400")
                            }
                            key={typeIndex}
                        >
                            {type.replaceAll("_", " ")}
                        </button>
                    );
                })}
            </div>

            <Header
                index={"02"}
                title={"Lock on targets"}
                description={"Select the muscles judged for annihilation."}
            />
            <div className="bg-slate-950  border border-solid border-blue-400 rounded-lg flex flex-col">
                <button
                    onClick={setToggleDropdownfunc}
                    className="relative p-3 flex items-center justify-center"
                >
                    <p className="flex flex-col">
                        {muscleGroup.length == 0
                            ? "Select muscle group"
                            : muscleGroup.join(" ")}
                    </p>
                    <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
                </button>
                {toggleDropdown && (
                    <div className="flex flex-col px-3 pb-3">
                        {(poison == "individual"
                            ? WORKOUTS[poison]
                            : Object.keys(WORKOUTS[poison])
                        ).map((muscle, muscleIndex) => {
                            return (
                                <button
                                    onClick={() => updateMuscleGroup(muscle)}
                                    key={muscleIndex}
                                    className="uppercase duration-200 hover:text-blue-400"
                                >
                                    {muscle}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <Header
                index={"03"}
                title={"Become Juggernaut"}
                description={"Select your ultimate objective."}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.keys(SCHEMES).map((schemetype, schemeTypeIndex) => {
                    return (
                        <button
                            onClick={() => {
                                setGoal(schemetype);
                            }}
                            className="bg-slate-950 border duration-200 px-4 hover:border-blue-600 rounded-lg py-3 border-blue-400 capitalize"
                            key={schemeTypeIndex}
                        >
                            {schemetype.replaceAll("_", " ")}
                        </button>
                    );
                })}
            </div>
            <Button func={updateWorkout} text={"Formulate"} />
        </SectionWrapper>
    );
}
