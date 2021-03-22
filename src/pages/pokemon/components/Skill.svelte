<script>
  import Icon from 'svelte-awesome';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';

  let isLoadingSkillBox = true;
  let generations = [];
  let generationIndex = 0;
  let skills = [];

  async function createSkillSet() {
    try {
      const responseGenerationValues = await fetch('https://pokeapi.co/api/v2/generation');
      const jsonGenerationValues = await responseGenerationValues.json();
      generations = jsonGenerationValues.results;
    } catch (e) {
      console.log(e);
    }
  }

  function createLevelMoves() {
    if (pokemon.moves) {
      const filtered = [];
      for (let i = 0; i < pokemon.moves.length; i++) {
        console.log(pokemon.moves[i]);
        for (let j = 0; j < pokemon.moves[i].version_group_details.length; j++) {
          const versionDetailInfo = pokemon.moves[i].version_group_details[j];
          const versionGroup = versionDetailInfo.version_group;
          const moveLearnMethod = versionDetailInfo.move_learn_method;
          if (versionGroup.name === 'black-white' && ['level-up'].includes(moveLearnMethod.name)) {
            filtered.push({
              skill: pokemon.moves[i].move,
              info: versionDetailInfo,
            });

            break;
          }
        }
      }

      const sorted = filtered.sort((a, b) => {
        if (a.info.level_learned_at >= b.info.level_learned_at) {
          return 1;
        }

        if (a.info.level_learned_at < b.info.level_learned_at) {
          return -1;
        }
      });

      isLoadingSkillBox = false;
      skills = sorted;
      // console.log(skills);
    }
  }

  async function getSkillContent(url) {
    try {
      const response = await fetch(url);
      // pokemon = await response.json();
      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="pokemon-skills">
  <div class="title">Skill</div>
  <div class="game-generation-tabs">
    <nav>
      {#each generations as value, index}
        <div class="generation-row">
          <span>
            <button
              class={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                index === generationIndex ? 'text-blue-500 font-medium border-blue-500' : ''
              }`}
              on:click={(e) => (generationIndex = index)}
            >
              {value.name}
            </button>
          </span>
          <span>abcd</span>
        </div>
      {/each}
    </nav>
  </div>

  {#if isLoadingSkillBox}
    <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
  {:else}
    <table class="skill-table-set table-auto">
      <thead>
        <tr>
          <th class="w-1/4">-</th>
          <th class="w-3/4">-</th>
        </tr>
      </thead>
      <tbody>
        {#each skills as value}
          <tr class="skill-name" on:click={(e) => getSkillContent(value.skill.url)}>
            <td>{value.info.level_learned_at}</td>
            <td>{value.skill.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style type="text/scss">
  .pokemon-skills {
    width: 300px;

    .title {
      margin-top: 50px;
    }

    .game-generation-tabs {
      margin-top: 15px;
    }

    .generation-row {
      width: 500px;

      span {
        display: inline-block;
      }

      button {
        width: 180px;
      }
    }

    .skill-table-set {
      width: 100%;
      border: 1px solid;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 50px;

      td {
        border: 1px solid;
      }
    }

    .skill-name {
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
