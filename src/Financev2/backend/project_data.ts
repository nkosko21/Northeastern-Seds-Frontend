const projects = ['Rover', 'SUITS', 'Big Idea', 'Lunabotics', 'Business', 'Astronomy', 'RAS-CL', 'Miscellaneous'];
const subteams = ['(Rover) Mechanical', '(Rover) Life Detection', '(Rover) Electrical', '(Rover) Software', '(Business) Outreach', '(Business) Admin','(Business) Finance','(Astronomy) General', '(Rover) General'];

export const teams: {[key: string]: [string]} = {};

projects.forEach((key, index) => {
    teams[key] = [''];
})

subteams.forEach((key, index) => {
    const project = key.split(" ")[0].replace("(", "").replace(")", "")
    if( teams[project][0] == '' ){
        teams[project][0] = key.split(" ")[1]
    }else{
        teams[project].push(key.split(" ")[1]);
    }
})