import { isDevMode } from '@angular/core';

export const APP_CONFIG = {
  defaultValues: {
    paisId: 589,
    mayoriaEdad: 18
  },
  educacion: {
    nivelSecundariaId: 2,
    nivelSuperiorId: 4,
    nivelTecnicoProductivaId: 3,
    nivelEducativoPosgradoId: 5
  },
  regimenLaboral: {
    regimenesConGrupoOcupacional: [2, 3] as const,
    regimenesConEscalaCategoriaGrupo: [1, 2, 3] as const
  },
  regimenPensionario: {
    DL_19990: 1,
    DL_20530: 3,
    AFP: 2,
    regimenesPublicos: [1, 3] as const,
    regimenesPrivados: [2] as const,
  },
  archivos: {
    baseUrl: '/archivo-handler',
    rutas: {
      upload: '/upload',
      download: '/download',
      view: '/view'
    }
  },
  api: {
    baseUrl: !isDevMode()
      ? 'http://localhost:9084/api/escalafon'
      : 'http://127.0.0.1:8000/api/escalafon'
  },
  auth: {
    recuperarPasswordUrl: 'http://45.169.92.186:9080/sesion/recuperar-password'
  }
} as const;

// Tipos derivados del config
type RegimenConGrupo = typeof APP_CONFIG.regimenLaboral.regimenesConGrupoOcupacional[number];
type RegimenConEscalaCategoriaGrupo = typeof APP_CONFIG.regimenLaboral.regimenesConEscalaCategoriaGrupo[number];
type RegimenPensionarioPublico = typeof APP_CONFIG.regimenPensionario.regimenesPublicos[number];
type RegimenPensionarioPrivado = typeof APP_CONFIG.regimenPensionario.regimenesPrivados[number];

export type AppConfig = typeof APP_CONFIG;
export { 
  RegimenConGrupo, 
  RegimenConEscalaCategoriaGrupo,
  RegimenPensionarioPublico,
  RegimenPensionarioPrivado 
}; 