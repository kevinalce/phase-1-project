/** Globals **/
let workouts = [];

/** NODE Getters **/
const mainDiv = () => document.getElementById('main');

const homePageLink = () => document.getElementById('home-Page-Link');

const WorkoutList = () => document.getElementById('Workout-List');

const logWorkoutLink = () => document.getElementById('diet-plan-link');

const getWorkout = () => document.getElementById('workout')

const getReps = () => document.getElementById('reps');

const getRest = () => document.getElementById('rest');

/** Templates **/


const workoutListTemplate = () => {
    return `
    <h1>Workout List</h1>
    <table class="highlight">
            <thead>
              <tr>
                  <th>workout</th>
                  <th>Reps</th>
                  <th>Rest time inbetween each set</th>
              </tr>
            </thead>
    
            <tbody>
              ${renderWorkouts()}
            </tbody>
          </table>
    `
}


const workoutTemplate = (workout) => {
    return `
    <tr>
        <td>${workout.workout}</td>
        <td>${workout.reps}</td>
        <td>${workout.rest}</td>
    </tr>
    `
}
/** Renderers **/

const renderHomePage = () => {
    mainDiv().innerHTML = ''
    const h1 = document.createElement('h1');
    h1.classList.add('center-align');
    h1.innerText = "Lets get swole"
    mainDiv().appendChild(h1);
}

const renderWorkoutListPage = async () => {
    await loadWorkouts();
    mainDiv().innerHTML = workoutListTemplate();
}

const renderWorkouts = () => {
    return workouts.map(workout => workoutTemplate(workout));
}

const renderlogWorkoutPage = async () => {
    const h1 = document.createElement('h1');
    const form = document.createElement('form');
    const workoutDiv = document.createElement('div');
    const workoutInput = document.createElement('input');
    const workoutLabel = document.createElement('label');
    const repsDiv = document.createElement('div');
    const repsInput = document.createElement('input');
    const repsLabel = document.createElement('label');
    const restDiv = document.createElement('div');
    const restInput = document.createElement('input');
    const restLabel = document.createElement('label');
    const submitButton = document.createElement('input');



    //h1.className='center-align';
    workoutDiv.className = 'input-field';
    repsDiv.className = 'input-field';
    restDiv.className = 'input-field';
    submitButton.className = 'waves-effect waves-light btn';
    

    workoutInput.setAttribute('id', "workout");
    workoutInput.setAttribute('type','text');
    workoutLabel.setAttribute("for", "workout");
    repsInput.setAttribute('id', "reps");
    repsInput.setAttribute('type','text');
    repsLabel.setAttribute("for", "reps");
    restInput.setAttribute('id', "rest");
    restInput.setAttribute('type','text');
    restLabel.setAttribute("for", "rest");
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'log workout')
    




    h1.innerText = 'Log Workout'
    workoutLabel.innerText = "workout"
    repsLabel.innerText = "reps"
    restLabel.innerText = "rest"

    workoutDiv.appendChild(workoutInput);
    workoutDiv.appendChild(workoutLabel);
    repsDiv.appendChild(repsInput);
    repsDiv.appendChild(repsLabel);
    restDiv.appendChild(restInput);
    restDiv.appendChild(restLabel);
    




    form.appendChild(workoutDiv);
    form.appendChild(repsDiv);
    form.appendChild(restDiv);
    form.appendChild(submitButton);

    form.addEventListener('submit', logWorkoutEvent)
    

    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);

        //<form >
           // <div class="input-field">
             //   <input id="workout" type="text">
               // <label for="workout">workout</label>
             // </div>
            //<div class="input-field col s6">
             //   <input id="reps" type="text">
               // <label for="reps">reps</label>
              //</div>
            //<div class="input-field col s6">
             //   <input id="rest" type="text">
               // <label for="rest">rest</label>
              //</div>
              //<input type="submit" value="Log workout" class="waves-effect waves-light btn">
        //</form>

}
    
/**e event  */
const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', () => {
        renderHomePage();
    })

}

const loadWorkouts = async () => {
    const resp = await fetch('http://localhost:3000' + '/workouts');
    const data = await resp.json();
    workouts = data;
}


const WorkoutListPage = () => {
    WorkoutList().addEventListener('click', (e) => {
        e.preventDefault();
    
        renderWorkoutListPage();
    })
}


const logWorkoutLinkEvent = () => {
    logWorkoutLink().addEventListener("click", (e) => {
        e.preventDefault();
        renderlogWorkoutPage();
    })
}

const logWorkoutEvent = e => {
    e.preventDefault();
    console.log('workout', getWorkout().value)
    console.log('reps', getReps().value)
    console.log('rest', getRest().value)
    fetch('http://localhost:3000/workouts', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            workout: getWorkout().value,
            reps: getReps().value,
            rest: getRest().value
        })
    })
    .then(resp => resp.json())
    .then(workout => {
        renderWorkoutListPage();
    })

}



/*********************/





/** WHEN THE DOM LOADS **/

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
   homePageLinkEvent();
   WorkoutListPage();
   logWorkoutLinkEvent();
})
