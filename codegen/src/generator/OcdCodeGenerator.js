/*
** Copyright (c) 2020, 2022, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/

export class OcdCodeGenerator {
    commonElements = [
        'compartment_id', // Common Element
        'defined_tags',   // Common Element
        'display_name',   // Common Element
        'freeform_tags',  // Common Element
        'id',             // Common Element
        'name',           // Common Element
    ]
    commonIgnoreElements = [
        'region',
        'inactive_state', 
        'is_accessible',
        'state', 
        'time_created',
        'system_tags'
    ]
    constructor(prefix='Oci') {
        this.prefix = prefix
        this.resources = []
    }

    generate(resource, schema) {
        this.resources.push(resource)
        this.resourceFile = this.generateResourcesFile(this.resources)
        this.resourceAutoGeneratedDefinitionFile = this.autoGeneratedContent(resource, schema)
        this.resourceDefinitionFile = this.content(resource, schema)
    }

    generateResourcesFile(resources) {
        const contents = `${this.copyright()}
${this.autoGeneratedWarning()}

${resources.sort().map((r) => `export { ${this.generateNamespaceName(r)}, ${this.generateClassName(r)} } from './${this.generateResourcesDirectory()}/${this.generateNamespaceName(r)}'`).join('\n')}
    `
            return contents
    }

    today() {
        const today = new Date()
        return `${today.getDate() < 10 ? '0' : ''}${today.getDate()}/${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}/${today.getFullYear()}`
    }

    now() {
        const today = new Date()
        return `${this.today()} ${today.getHours()}:${today.getMinutes() < 10 ? '0' : ''}${today.getMinutes()}:${today.getSeconds() < 10 ? '0' : ''}${today.getSeconds()}`
    }


    copyright() {
        return `/*
** Copyright (c) 2020, 2023, Oracle and/or its affiliates.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/`
    }

    autoGeneratedWarning() {
        return `/*
**
** ======================================================================
** === Auto Generated Code All Edits Will Be Lost During Regeneration ===
** ======================================================================
*/`
    }

    generateGeneratedDirectory = () => 'generated'
    generateResourcesDirectory = () => 'resources'
    generateClassName = (resource) => `${this.prefix}${this.toTitleCase(resource.split('_').join(' ')).split(' ').join('')}Client`
    generateClassFilename = (resource) => this.generateInterfaceFilename(resource)
    generateAutoGeneratedClassName = (resource) => `${this.prefix}${this.toTitleCase(resource.split('_').join(' ')).split(' ').join('')}AutoGeneratedClient`

    generateInterfaceName = (resource) => `${this.prefix}${this.toTitleCase(resource.split('_').join(' ')).split(' ').join('')}`
    generateInterfaceFilename = (resource) => `${this.generateInterfaceName(resource)}.ts`
    generateAutoGeneratedInterfaceName = (resource) => `${this.prefix}${this.toTitleCase(resource.split('_').join(' ')).split(' ').join('')}AutoGenerated`

    generateNamespaceName = (resource) => this.generateInterfaceName(resource)
    generateNamespaceFilename = (resource) => this.generateInterfaceFilename(resource)
    generateAutoGeneratedNamespaceName = (resource) => this.generateAutoGeneratedInterfaceName(resource)

    toTitleCase = (str) => str.replace(/\b\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();}).replaceAll('-', '_').replace(/\W+/g, ' ')
    toCamelCase = (str) => `${this.toTitleCase(str.split('_').join(' ')).split(' ').map((e, i) => i === 0 ? e.toLowerCase() : e).join('')}`

    getSchemaObjects = (schema) => Object.values(schema.attributes).filter(f => f.attributes).reduce((a, c) => [...a, c, ...this.getSchemaObjects(c)], []).reduce((a, c) => [...a, ...a.find((o) => o.name === c.name) ? [] : [c]], [])
    // getSchemaObjects = (schema) => Object.values(schema.attributes).filter(f => f.type === 'object').reduce((a, c) => [...a, c, ...this.getSchemaObjects(c)], [])
    // .filter(f => f.type === 'object').reduce((a, c) => [...a, c, ...this.getSchemaObjects(c)], [])
    // ...c.attributes.filter(f => f.type === 'object')
}

export default OcdCodeGenerator