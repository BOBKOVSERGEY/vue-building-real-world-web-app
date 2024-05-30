import { shallowMount } from "@vue/test-utils";
import GetLocation from "@/components/GetLocation.vue";
describe("GetLocation", () => {
    it("should render the component without crashing", async (): Promise<void> => {

        const wrapper = await shallowMount(GetLocation);
        expect(wrapper).toBeTruthy();
    });

    
});