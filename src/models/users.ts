export interface UserDocument {
    id: string;
    name: string;
    email: string;
    auth: {
        password: string;
    };
    inboxId: string;
}

export const users: UserDocument[] = [  {
    id: 'b2206b45-2cec-4936-bd41-909860a104b0',
    name: 'prince',
    email: 'prince@domain.com',
    auth: {
      password: '$2b$10$nehvpztAMQs0AzHSGgg2TePswhtOcw5FjHLSPU6BT6czNTL4jiRWK'
    },
    inboxId: '1db654f0-4317-49aa-913c-6f4e3390926d'
  },
  {
    id: 'e3b37b8f-56bf-4235-bb50-b6eaf8173794',
    name: 'thami',
    email: 'thami@domain.com',
    auth: {
      password: '$2b$10$TAV6QpWGBFBFsObLFjtB1.4aTsDgrQAdb8MXSYTaVgQl/hOueH3d.'
    },
    inboxId: '422069c9-0f8b-4d13-a853-f69bd49c2d7b'
  },  {
    id: '0598570b-af4f-4eca-ad76-bdab9c0609cd',
    name: 'kevin',
    email: 'kevin@domain.com',
    auth: {
      password: '$2b$10$mD9yC1V1.fb3SnwkSs0HYeXU5OYarWgaMqpPNohX57q/Zv.vzH0/G'
    },
    inboxId: 'ea3bdc8d-1ccf-423c-af82-6e04dccabb0c'
  }

];