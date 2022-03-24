
const getTasks = require('../controllers/tasksController.js');

describe('Test get all Tasks', function(){
     test('response to /', ()=>{
        const request = {};
        const response = { text:'',
        send: function(input){
            this.text = input
        }
        };
        getTasks(request, response);
        expect(response.text).toEqual('Default task text');
     })
})
