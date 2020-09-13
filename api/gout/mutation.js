
const {
    createGout : createGoutInDb,
    modifyGout : modifyGoutInDb,
    deleteGout : deleteGoutInDb,
    getAllGouts: getGouts
} = require('./data')

module.exports.createGout = ({nom}) => {
    return createGoutInDb(nodemon)
}

module.exports.modifyGout = ({nom, id}) => {
    return modifyGoutInDb(nom, id)
}

module.exports.deleteGout = async({id}) => {
    const Gouts = await getAllGouts()
    const checkID = Gouts.find((gout) => gout.id === id)
    if(checkID){
        deleteGoutInDb(id)
        return `L'élément est supprimé`
    }
    return "Aucun gout avec cet ID"
}