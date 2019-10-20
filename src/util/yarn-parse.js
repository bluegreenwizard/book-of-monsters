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

//Parse node body into object with text and list of option objects.
function parseBody(body) {
    //Remove whitespace from start and end of body
    body = body.replace(/^[\s\\n]+|[\s\\n]+$/g, '');
    //Text is everything except stuff in option brackets
    const text = body.replace(/\[\[.+\]\]/g, '');
    //Get each option between [[ ]] in node body.
    const optionStrings = body.match(/\[\[.+\]\]/g) || [];
    //Parse each option into text and destination;
    const options = optionStrings.map(opt => {
        const splitOption = opt.match(/\[\[(.+)\|(.+)\]\]/);
        //Remove whitespace from start and end of answers
        const text = splitOption[1].replace(/^[\s\\n]+|[\s\\n]+$/g, '');
        //TODO: Above doesn't fix issue

        return {
            text: text,
            destination: splitOption[2]
        }
    });

    return {
        text, //String of text content
        options //List of option objects: { text, destination }
    }
}

//Split node text on <<next>> and remove starting and ending whitespace
function getBodyParts(node) {
    const parts = node.body.split('<<n>>');
    return parts.map(part => {
        const partObject = parseBody(part);
        
        return partObject;
    });
}

export default {
    getBodyParts,
    getNode
};