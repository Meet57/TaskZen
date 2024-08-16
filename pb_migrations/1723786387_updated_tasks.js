/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8h4vm0tndhycumh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w0ntb5yr",
    "name": "createdBy",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8h4vm0tndhycumh")

  // remove
  collection.schema.removeField("w0ntb5yr")

  return dao.saveCollection(collection)
})
