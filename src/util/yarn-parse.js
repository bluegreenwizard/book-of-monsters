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

function getParsedLines(lines) {
    return lines.map(line => {
        if (/^<</.test(line)) {
            //Command
            return {
                type: 'command',
                content: line.match(/^<<(.+)>>/)[1]
            }
        } else if (/---/.test(line)) {
            //Break
            return {
                type: 'command',
                content: 'waitFor advanceDialogue'
            }
        } else if (/^\[\[/.test(line)) {
            //Goto
            return {
                type: 'link',
                content: line.match(/^\[\[(.+)\]\]/)[1]
            }
        } else {
            //Dialogue
            return {
                type: 'dialogue',
                content: line 
            }
        }
    });
}

//Public
async function parseNode(title) {
    const node = await getNode(title);
    return getParsedLines(node.body.split('\n'));
}

export default {
    parseNode
}