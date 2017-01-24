var self = module.exports={
room_list   : {},
create_room : function()
{
	var room = Math.random().toString(36).substring(7);
    self.room_list[room] = room;
	return room;
},

remove_room : function(room)
{
    delete self.room_list[room];
}

}