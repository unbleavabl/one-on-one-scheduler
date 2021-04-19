let peopleArray = ['amar', 'viraj', 'mansi', 'sayima', 'antony', 'dale', 'aj', 'indu'];
let slotsArray = ['3:00', '3:10', '3:20', '3:30', '3:40', '3:50', '4:00'];

let unusedSlot = (person1, person2, usedSlot) => (slot) =>  {
    const person1SlotFree = !usedSlot[person1] || (usedSlot[person1].indexOf(slot) < 0);
    const person2SlotFree = !usedSlot[person2] || (usedSlot[person2].indexOf(slot) < 0);
    return person1SlotFree && person2SlotFree;
}

let createSchedule = (people, slots) => {
    const { output } = people.reduce((acc1, person1) => {
        return people.reduce((acc2, person2) => {
            const { usedSlot, output, pairings } = acc2;
            if(
                person1 === person2 ||
                pairings[`${person1}_${person2}`] || 
                pairings[`${person2}_${person1}`]
            ) {
                return acc2;
            }
            const availableSlot = slots.find(unusedSlot(person1, person2, usedSlot));
            return {
                pairings: {
                    ...pairings,
                    [`${person1}_${person2}`]: true,
                },
                usedSlot: {
                    ...usedSlot,
                    [person1]: [...(usedSlot[person1] || []), availableSlot],
                    [person2]: [...(usedSlot[person2] || []), availableSlot],
                },
                output: {
                    ...output,
                    [availableSlot]: [
                        ...(output[availableSlot] || []), 
                        [person1, person2],
                    ],
                }
            }
        },{ ...acc1 }) 

    }, {
        usedSlot: {},
        output: {},
        pairings: {},
    })
    return output;
}

createSchedule(peopleArray, slotsArray);
