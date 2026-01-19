import CrudRepository from "./crud-repository";
import Comment from "../models/comment";

class commentRepository extends CrudRepository {
    constructor(){
        super(Comment);
    }
}