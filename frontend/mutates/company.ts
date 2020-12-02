import { ICompany } from '@/types/company';
import { mutate } from 'swr';

export const addCompanyMutate = async (url: string, name: string, info: string, companyUrl: string) => {
  const companyItem: ICompany = {
    id: 0,
    info,
    is_admin: true,
    name,
    url: companyUrl,
    workers: []
  }
  await mutate(url, async (company: ICompany[]) => {
    if (company) {
      return [...company, companyItem];
    }
  }, false);
}

export const deleteCompanyMutate = async (url: string, id: number) => {
  await mutate(url, async (company: ICompany[]) => {
    if (company) {
      return company.filter(companyitem => companyitem.id !== id);
    }
  }, false);
}

export const changeCompanyMutate = async (triggerUrl: string, id: number, name: string, info: string, url: string) => {
  await mutate(triggerUrl, async (company: ICompany[]) => {
    if (company) {
      const index = company.findIndex(item => item.id === id);
      let newCompany = [...company];
      newCompany[index] = {
        ...company[index],
        name,
        info,
        url
      };
      return newCompany;
    }
  }, false);
}