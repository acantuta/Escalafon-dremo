import { Injectable } from '@angular/core';
import { APP_CONFIG, RegimenConGrupo, RegimenConEscalaCategoriaGrupo, RegimenPensionarioPublico, RegimenPensionarioPrivado } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = APP_CONFIG;

  getDefaultPaisId(): number {
    return this.config.defaultValues.paisId;
  }

  getMayoriaEdad(): number {
    return this.config.defaultValues.mayoriaEdad || 18;
  }

  getSecundariaNivelId(): number {
    return this.config.educacion.nivelSecundariaId;
  }

  getSuperiorNivelId(): number {
    return this.config.educacion.nivelSuperiorId;
  }

  getNivelTecnicoProductivaId(): number {
    return this.config.educacion.nivelTecnicoProductivaId;
  }
  
  getRegimenesConGrupoOcupacional(): readonly number[] {
    return this.config.regimenLaboral.regimenesConGrupoOcupacional;
  }

  tieneGrupoOcupacional(regimenId: number | undefined): boolean {
    if (!regimenId) return false;
    return this.config.regimenLaboral.regimenesConGrupoOcupacional.includes(regimenId as RegimenConGrupo);
  }

  getRegimenesConEscalaCategoriaGrupo(): readonly number[] {
    return this.config.regimenLaboral.regimenesConEscalaCategoriaGrupo;
  }

  tieneEscalaCategoriaGrupo(regimenId: number | undefined): boolean {
    if (!regimenId) return false;
    return this.config.regimenLaboral.regimenesConEscalaCategoriaGrupo.includes(regimenId as RegimenConEscalaCategoriaGrupo);
  }

  getArchivoBaseUrl(): string {
    return this.config.archivos.baseUrl;
  }

  getArchivoUploadUrl(): string {
    return this.config.archivos.baseUrl + this.config.archivos.rutas.upload;
  }

  getArchivoExternoUrl(uuid: string): string {
    return this.getApiBaseUrl() + this.config.archivos.baseUrl + this.config.archivos.rutas.view + '/' + uuid;
  }

  getArchivoDownloadUrl(uuid: string): string {
    return this.getApiBaseUrl() + this.config.archivos.baseUrl + this.config.archivos.rutas.download + '/' + uuid;
  }

  getNivelEducativoPosgradoId(): number {
    return this.config.educacion.nivelEducativoPosgradoId;
  }

  // Método para actualizar configuraciones en runtime si es necesario
  updateConfig(newConfig: Partial<typeof APP_CONFIG>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Métodos para regímenes pensionarios
  getRegimenPensionarioDL19990(): number {
    return this.config.regimenPensionario.DL_19990;
  }

  getRegimenPensionarioDL20530(): number {
    return this.config.regimenPensionario.DL_20530;
  }

  getRegimenPensionarioAFP(): number {
    return this.config.regimenPensionario.AFP;
  }

  getRegimenesPublicos(): readonly number[] {
    return this.config.regimenPensionario.regimenesPublicos;
  }

  getRegimenesPrivados(): readonly number[] {
    return this.config.regimenPensionario.regimenesPrivados;
  }

  esRegimenPublico(regimenId: number | undefined): boolean {
    if (!regimenId) return false;
    return this.config.regimenPensionario.regimenesPublicos.includes(regimenId as RegimenPensionarioPublico);
  }

  esRegimenPrivado(regimenId: number | undefined): boolean {
    if (!regimenId) return false;
    return this.config.regimenPensionario.regimenesPrivados.includes(regimenId as RegimenPensionarioPrivado);
  }

  getApiBaseUrl(): string {
    return this.config.api.baseUrl;
  }
} 