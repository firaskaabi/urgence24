import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { MapOverlayComponent } from './component/map-overlay/map-overlay.component';
@Injectable({
  providedIn: 'root'
})
export class MapOverlayServiceService {
  private rootViewContainer: ViewContainerRef;

    constructor(private factoryResolver: ComponentFactoryResolver) {
        this.factoryResolver = factoryResolver;
    }
      setRootViewContainerRef(viewContainerRef) {
          this.rootViewContainer = viewContainerRef;
      }
    addDynamicComponent(modalTitle: string, modalText: string) {
        const factory = this.factoryResolver.resolveComponentFactory(MapOverlayComponent);
        const component = factory.create(this.rootViewContainer.parentInjector);
        component.instance.modalTitle = modalTitle;
        component.instance.modalText = modalText;
        // Subscribe to the closeModal event and destroy the component
        component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));

        this.rootViewContainer.insert(component.hostView);
    }

    removeDynamicComponent(component) {
        component.destroy();
    }
}
