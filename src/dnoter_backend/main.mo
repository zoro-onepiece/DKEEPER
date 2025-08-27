import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

 persistent actor DNoter{

  public type Note = {
    title :Text;
    content:Text;
  };

 stable  var  notes : List.List<Note> = List.nil<Note>();

  public func createNote(titleText:Text ,contentText:Text){
   let newNote : Note ={
      title = titleText;
      content = contentText
   };
   notes:= List.push(newNote ,notes);
   Debug.print(debug_show(notes));
  };


  public query func readNotes() : async [Note]{
     return List.toArray(notes); 
  };
  
  public func removeNote(index : Nat) {

   let listFront = List.take(notes , index);
   let listBack = List.drop( notes , index + 1,);
    notes:= List.append(listFront , listBack);
  }
}