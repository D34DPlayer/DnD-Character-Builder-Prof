/* variables */
var newChar = new Object;

var charRace = ["Human", "Elf", "Orc", "Dwarf", "Dragonborn", "Troll"];
var charOrigin = ["Scholar", "Hermit", "Peasant", "Noble", "Wildborn"];
var charClass = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", 
"Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];

var page = 0;

/* functions */
function getId(id){
	return document.getElementById(id);
}

function setPage(page){
	var sR = '';
	switch(page){
		case 1:
			sR += "<h3>Choose Origins:</h3>";
			sR += "<form action=# onSubmit='addChar(this)'>";
			for(let ca of charOrigin){
				sR += "<input type='radio' name='origin' value=" + ca + ">" + ca;
			}
			sR += "<br> <input type='submit' value='Next Page'>";
			sR += "</form>";
			break;
		case 2:
			sR += "<h3>Choose Class:</h3>";
			sR += "<form action=# onSubmit='addChar(this)'>";
			for(let cc of charClass){
				sR += "<input type='radio' name='cla' value=" + cc + ">" + cc;
			}
			sR += "<br> <input type='submit' value='Next Page'>";
			sR += "</form>";
			break;
		case 3:
			sR += "<h3>Character Description</h3>";
			sR += "<form action=# onSubmit='addChar(this)'>";
			sR += "</form>";
			break;
		default:
			sR += "<h3>Choose Race:</h3>";
			sR += "<form action=# onSubmit='addChar(this)'>";
			for(let cr of charRace){
				sR += "<input type='radio' name='race' value=" + cr + ">" + cr;
			}
			sR += "<br> <input type='submit' value='Next Page'>";
			sR += "</form>";
	}
	getId('creation').innerHTML = sR;
}

function addChar(form){
	switch(page){
		case 1:
			var addOrg = form.origin.value;
			newChar['origin'] = addOrg;
			break;
		case 2:
			var addClass = form.cla.value;
			newChar['class'] = addClass;
			break;
		default:
			var addRace = form.race.value;
			newChar['race'] = addRace;
	}
	page++;
	setPage(page);
	return false;
}

async function main(){
	setPage(page);
	await loadNav();
}

document.addEventListener("load", main);
