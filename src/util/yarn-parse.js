//Load dialogue tree JSON
async function fetchDialogueTree() {
    const res = await fetch('./assets/dialogue.json');
    const dialogue = await res.json();
    return dialogue;
}

//Get node from title
async function getNode(title) {
    const dialogue = await fetchDialogueTree();
    return dialogue.find(n => {
        return n.title === title;
    });
}

//Split node text on <<n>> and remove starting and ending whitespace
function getBodyParts(node) {
    const parts = node.body.split('<<n>>');
    return parts.map(part => {
        const partObject = parseBody(part);
        
        return partObject;
    });
}

//Parse node body into object.
//Object has dialogue text,
//triggered commands,
//and dialogue options.
function parseBody(body) {
    //Remove whitespace from start and end of body.
    body = body.replace(/^[\s\\n]+|[\s\\n]+$/g, '');

    //Text is everything except stuff in option brackets
    let text = body.replace(/\[\[.+\]\]/g, '');
    text = text.replace(/\{\{.+\}\}/g, '');
    //Get each option between [[ ]] in node body.
    const optionStrings = body.match(/\[\[.+\]\]/g) || [];
    //Get each command between {{ }} in node body.
    let commands = body.match(/\{\{.+\}\}/g) || [];

    //Get command (left side of :), and argument (right side of :) from each command.
    commands = commands.map(cmd => { 
        //TODO: Refactor this puppy right here
        let arg = '';
        const command = cmd.match(/\{\{(.+):.*\}\}/)[1];
        if (arg = cmd.match(/:(.+)\}\}/)) {
            arg = arg[1];
        }
        return {
            command,
            arg
        }
    });

    //Parse each option into text and destination.
    const options = optionStrings.map(opt => {
        const splitOption = opt.match(/\[\[(.+)\|(.+)\]\]/);
        //Remove whitespace from start and end of answers.
        const text = splitOption[1].replace(/^[\s\\n]+|[\s\\n]+$/g, '');
        //TODO: Above doesn't fix issue.

        return {
            text: text,
            destination: splitOption[2]
        }
    });

    return {
        text, //String of text content
        commands, //List of commands
        options //List of option objects: { text, destination }
    }
}

export default {
    getBodyParts,
    getNode
};