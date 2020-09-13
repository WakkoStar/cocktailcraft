var _ = require('lodash')
const {
    createGout : createGoutInDb,
    modifyGout : modifyGoutInDb,
    deleteGout : deleteGoutInDb,
    getAllGouts: getGouts,
    modifyGout
} = require('./data')

const executeRequestInDb = async(params, callback, msg) => {
    if(_.some(params, _.isUndefined)) throw new Error("empty fields")
    const gouts = await getGouts()
    const existsGout = gouts.find((gout) => gout.id == id)
    if(existsGout){
        callback({...params})
        return `${msg} (gout: ${existsGout.nom})`
    }else{
        throw new Error('no ID founded')
    }
}

module.exports.createGout = async({nom}) => {
    const gouts = await getGouts()
    const existsGout = gouts.find((gout) => gout.nom == nom)
    if(existsGout){
        throw new Error('Gout already exists')
    }else{
        createGoutInDb(nom)
        return `${nom} vient d'être créé avec succès`
    }
}

module.exports.modifyGout = async({nom, id}) => {
    return await executeRequestInDb(
        {nom, id},
        modifyGoutInDb,
        "Le goût vient d'être modifié avec succès"
    )
}

module.exports.deleteGout = async({id}) => {
    return await executeRequestInDb(
        {id},
        deleteGoutInDb,
        "Le goût vient d'être supprimé avec succès"
    )
}