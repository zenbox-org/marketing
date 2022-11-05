import { runBestOptionByBigNumber } from '../../../decimaker/models/Option.alternative'
import { Website } from '../Website'
import { Config } from '../../../../models/Config'
import { Domain } from '../../../dns/models/Domain'
import { getSpecification } from './getSpecification'
import { getDesign } from './getDesign'
import { Design } from './Design'
import { impl } from 'zenbox-util/todo'
import { num } from 'zenbox-util/bignumber'
import { Component } from '../Component'

export type GetWebsite = (project: Config) => Promise<Website>

export async function getWebsiteNormal(domain: Domain, project: Config): Promise<Website> {
  const specification = await getSpecification(project)
  const design = await getDesign(project)
  const components = await getComponentsFromDesign(design, project)
  return {
    domain,
    components,
  }
}

async function getComponentsFromDesign(design: Design, project: Config): Promise<Component[]> {
  throw impl()
}

export async function getWebsite(domain: Domain, project: Config): Promise<Website> {
  return runBestOptionByBigNumber(
    [
      async () => getWebsiteNormal(domain, project),
    ],
    async function (func) {
      return num(0)
    }
  )
}
