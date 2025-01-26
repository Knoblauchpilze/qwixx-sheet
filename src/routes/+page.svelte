<script lang="ts">
	import { FlexContainer, StyledLink, StyledTitle } from '@totocorpsoftwareinc/frontend-toolkit';
</script>

<FlexContainer>
	<StyledTitle text="Select your qwixx sheet" />
	<StyledLink text="Classic" link="/classic" showAsButton={true} />
	<StyledLink text="Variant 2" link="/variant2" showAsButton={true} />
	<StyledLink text="Custom" link="/custom" showAsButton={true} />
</FlexContainer>
