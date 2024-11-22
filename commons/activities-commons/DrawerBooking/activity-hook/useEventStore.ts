import { create } from "zustand";

export interface EventData {
  generalInfo: {
    details: {
      nameEvent: string;
      typeEvent: string;
      typeContract: string;
      CWAname: string;
      CWAnumber: number;
      initialDate: string;
      initialTime: string;
      openingDate: string;
      openingTime: string;
      closingDate: string;
      closingTime: string; 
      endDate: string;
      endTime: string;
      state: string;
    };
  };
  logistics: {
    assembly: {
      entryPlaceAssembly: string;
      initialDateAssembly: string;
      initialTimeAssembly: string;
    };
    dismantling: {
      entryPlaceDismantling: string;
      initialDateDismantling: string;
      initialTimeDismantling: string;
    };
    detailsLogistics: {
      sectors: number[];
      dateActivity: string;
      timeActivity: string;
      entryPoint: string;
      notes: string;
    };
    operationalDetails: {
      information: {
        expositorsQuantity: number | null;
      };
      ticketOffice: {
        ticketValue: number | null;
        area: string;
        schedule: string;
        ticketOfficeLocation: string;
      };
    };
    clientData: {
      client: {
        clientId: number | null;
        phoneNumber: string | null;
        email: string;
      };
      organizerOrResponsible: {
        responsibleName: string;
        phoneNumber: string | null;
        email: string;
      };
      technicalDirector: {
        techDirectorName: string;
        phoneNumber: string | null;
        email: string;
      };
      administrator: {
        administratorName: string;
        phoneNumber: string | null;
        email: string;
      };
    };
  };
}

interface EventStore {
  eventData: EventData;
  setGeneralInfo: (
    key: keyof EventData["generalInfo"]["details"],
    value: string
  ) => void;
  setLogisticsAssembly: (
    key: keyof EventData["logistics"]["assembly"],
    value: string
  ) => void;
  setLogisticsDismantling: (
    key: keyof EventData["logistics"]["dismantling"],
    value: string
  ) => void;
  setLogisticsDetails: (
    key: keyof EventData["logistics"]["detailsLogistics"],
    value: string | string[]
  ) => void;
  setOperationalDetails: (
    key: keyof EventData["logistics"]["operationalDetails"]["information"],
    value: number | null
  ) => void;
  setTicketOfficeDetails: (
    key: keyof EventData["logistics"]["operationalDetails"]["ticketOffice"],
    value: string | number
  ) => void;
  setClientData: (
    key: keyof EventData["logistics"]["clientData"]["client"],
    value: number | any
  ) => void;
  setOrganizerOrResponsible: (
    key: keyof EventData["logistics"]["clientData"]["organizerOrResponsible"],
    value: string | number
  ) => void;
  setTechnicalDirector: (
    key: keyof EventData["logistics"]["clientData"]["technicalDirector"],
    value: string | number
  ) => void;
  setAdministrator: (
    key: keyof EventData["logistics"]["clientData"]["administrator"],
    value: string | number
  ) => void;
  setSectors: (sectorIds: number[]) => void; 
  resetForm: () => void;
} 

// console.log("sectoooor", eventData.operationalDetails.sectors)

const useEventStore = create<EventStore>((set) => ({
  eventData: {
    generalInfo: {
      details: {
        nameEvent: "",
        typeEvent: "",
        typeContract: "",
        CWAname: "",
        CWAnumber: 0,
        initialDate: "",
        initialTime: "",
        openingDate: "",
        openingTime: "",
        closingDate: "",
        closingTime: "", 
        endDate: "",
        endTime: "",
        state: "",
      },
    },
    logistics: {
      assembly: {
        entryPlaceAssembly: "",
        initialDateAssembly: "",
        initialTimeAssembly: "",
      },
      dismantling: {
        entryPlaceDismantling: "",
        initialDateDismantling: "",
        initialTimeDismantling: "",
      },
      detailsLogistics: {
        sectors: [],
        dateActivity: "",
        timeActivity: "",
        entryPoint: "",
        notes: "",
      },
      operationalDetails: {
        information: {
          expositorsQuantity: null,
        },
        ticketOffice: {
          ticketValue: null,
          area: "",
          schedule: "",
          ticketOfficeLocation: "",
        },
      },
      clientData: {
        client: {
          clientId: null,
          phoneNumber: "",
          email: "",
        },
        organizerOrResponsible: {
          responsibleName: "",
          phoneNumber: "",
          email: "",
        },
        technicalDirector: {
          techDirectorName: "",
          phoneNumber: "",
          email: "",
        },
        administrator: {
          administratorName: "",
          phoneNumber: "",
          email: "",
        },
      },
    },
  },

  // Setters for each section
  setGeneralInfo: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        generalInfo: {
          details: { ...state.eventData.generalInfo.details, [key]: value },
        },
      },
    })),

  setLogisticsAssembly: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        logistics: {
          ...state.eventData.logistics,
          assembly: { ...state.eventData.logistics.assembly, [key]: value },
        },
      },
    })),

  setLogisticsDismantling: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        logistics: {
          ...state.eventData.logistics,
          dismantling: { ...state.eventData.logistics.dismantling, [key]: value },
        },
      },
    })),

  setLogisticsDetails: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        logistics: {
          ...state.eventData.logistics,
          detailsLogistics: {
            ...state.eventData.logistics.detailsLogistics,
            [key]: value,
          },
        },
      },
    })),

  setOperationalDetails: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        logistics: {
          ...state.eventData.logistics,
          operationalDetails: {
            ...state.eventData.logistics.operationalDetails,
            information: {
              ...state.eventData.logistics.operationalDetails.information,
              [key]: value,
            },
          },
        },
      },
    })),

    setSectors: (sectorIds: number[]) => 
      set((state) => ({
        eventData: {
          ...state.eventData,
          logistics: {
            ...state.eventData.logistics,
            detailsLogistics: {
              ...state.eventData.logistics.detailsLogistics,
              sectors: sectorIds,
            },
          },
        },
      })),
    

  setTicketOfficeDetails: (key, value) =>
    set((state) => ({
      eventData: {
        ...state.eventData,
        logistics: {
          ...state.eventData.logistics,
          operationalDetails: {
            ...state.eventData.logistics.operationalDetails,
            ticketOffice: {
              ...state.eventData.logistics.operationalDetails.ticketOffice,
              [key]: value,
            },
          },
        },
      },
    })),

    setClientData: (
      key: keyof EventData["logistics"]["clientData"]["client"],
      value: string | number | null 
    ) =>
      set((state) => {
        return {
          eventData: {
            ...state.eventData,
            logistics: {
              ...state.eventData.logistics,
              clientData: {
                ...state.eventData.logistics.clientData,
                client: {
                  ...state.eventData.logistics.clientData.client,
                  [key]: value,
                },
              },
            },
          },
        };
      }),
    

    setOrganizerOrResponsible: (
      key: keyof EventData["logistics"]["clientData"]["organizerOrResponsible"],
      value: string | number | null // Ajusta el tipo para que coincida con la interfaz
    ) =>
      set((state) => ({
        eventData: {
          ...state.eventData,
          logistics: {
            ...state.eventData.logistics,
            clientData: {
              ...state.eventData.logistics.clientData,
              organizerOrResponsible: {
                ...state.eventData.logistics.clientData.organizerOrResponsible,
                [key]: value,
              },
            },
          },
        },
      })),

    setTechnicalDirector: (
      key: keyof EventData["logistics"]["clientData"]["technicalDirector"],
      value: string | number | null // Ajusta el tipo para que coincida con la interfaz
    ) =>
      set((state) => ({
        eventData: {
          ...state.eventData,
          logistics: {
            ...state.eventData.logistics,
            clientData: {
              ...state.eventData.logistics.clientData,
              technicalDirector: {
                ...state.eventData.logistics.clientData.technicalDirector,
                [key]: value,
              },
            },
          },
        },
      })),

    setAdministrator: (
      key: keyof EventData["logistics"]["clientData"]["administrator"],
      value: string | number | null // Ajusta el tipo para que coincida con la interfaz
    ) =>
      set((state) => ({
        eventData: {
          ...state.eventData,
          logistics: {
            ...state.eventData.logistics,
            clientData: {
              ...state.eventData.logistics.clientData,
              administrator: {
                ...state.eventData.logistics.clientData.administrator,
                [key]: value,
              },
            },
          },
        },
      })),

  resetForm: () =>
    set({
      eventData: {
        generalInfo: {
          details: {
            nameEvent: "",
            typeEvent: "",
            typeContract: "",
            CWAname: "",
            CWAnumber: 0,
            initialDate: "",
            initialTime: "",
            openingDate: "",
            openingTime: "",
            closingDate: "",
            closingTime: "", 
            endDate: "",
            endTime: "",
            state: "",
          },
        },
        logistics: {
          assembly: {
            entryPlaceAssembly: "",
            initialDateAssembly: "",
            initialTimeAssembly: "",
          },
          dismantling: {
            entryPlaceDismantling: "",
            initialDateDismantling: "",
            initialTimeDismantling: "",
          },
          detailsLogistics: {
            sectors: [],
            dateActivity: "",
            timeActivity: "",
            entryPoint: "",
            notes: "",
          },
          operationalDetails: {
            information: {
              expositorsQuantity: null,
            },
            ticketOffice: {
              ticketValue: null,
              area: "",
              schedule: "",
              ticketOfficeLocation: "",
            },
          },
          clientData: {
            client: {
              clientId: null,
              phoneNumber: null,
              email: "",
            },
            organizerOrResponsible: {
              responsibleName: "",
              phoneNumber: null,
              email: "",
            },
            technicalDirector: {
              techDirectorName: "",
              phoneNumber: null,
              email: "",
            },
            administrator: {
              administratorName: "",
              phoneNumber: null,
              email: "",
            },
          },
        },
      },
    }),
}));

export default useEventStore;
