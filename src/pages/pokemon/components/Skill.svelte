<script>
  import { onMount } from 'svelte';
  import Icon from 'svelte-awesome';
  import { faSpinner } from '@fortawesome/free-solid-svg-icons';
  export let pokemon;
  export let openPopup;

  let isLoadingSkillBox = true;
  let generations = [];
  let generationIndex = 0;
  let skills = [];

  onMount(async () => {
    await createSkillSet();
    if (generations.length > 0) {
      const defaultGeneration = generations[0];
      await createGameVersionColor(defaultGeneration.name);
    }

    createLevelMoves(0, 'yellow');
  });

  async function createSkillSet() {
    try {
      const responseGenerationValues = await fetch('https://pokeapi.co/api/v2/generation');
      const jsonGenerationValues = await responseGenerationValues.json();
      generations = jsonGenerationValues.results;
      for (let i = 0; i < generations.length; i++) {
        const createdVersion = await createGameVersionColor(generations[i].name);
        if (createdVersion.hasOwnProperty('version_groups')) {
          generations[i].originGameVersions = createdVersion.version_groups;
          generations[i].gameVersions = [];
          createdVersion.version_groups.map((group) => {
            if (group.name === 'black-2-white-2') {
              generations[i].gameVersions.push('black2');
              generations[i].gameVersions.push('white2');
            } else if (group.name === 'omega-ruby-alpha-sapphire') {
              generations[i].gameVersions.push('omegaruby');
              generations[i].gameVersions.push('alphasapphire');
            } else if (group.name === 'ultra-sun-ultra-moon') {
              generations[i].gameVersions.push('ultrasun');
              generations[i].gameVersions.push('ultramoon');
            } else if (group.name === 'lets-go') {
              generations[i].gameVersions.push('letsgo');
            } else {
              const parsed = group.name.split('-');
              if (parsed.length === 1) {
                generations[i].gameVersions.push(parsed[0]);
              } else if (parsed.length > 1) {
                parsed.map((text) => {
                  generations[i].gameVersions.push(text);
                });
              }
            }
          });
        }
      }

      isLoadingSkillBox = false;
    } catch (e) {
      console.log(e);
    }
  }

  async function createGameVersionColor(name) {
    try {
      const responseGameVersions = await fetch(`https://pokeapi.co/api/v2/generation/${name}`);
      return await responseGameVersions.json();
    } catch (e) {
      console.log(e);
    }
  }

  function createLevelMoves(tabIndex, gameVersion) {
    skills = [];
    generationIndex = tabIndex;
    if (pokemon.moves) {
      const filtered = [];
      for (let i = 0; i < pokemon.moves.length; i++) {
        for (let j = 0; j < pokemon.moves[i].version_group_details.length; j++) {
          const versionDetailInfo = pokemon.moves[i].version_group_details[j];
          const versionGroup = versionDetailInfo.version_group;
          const moveLearnMethod = versionDetailInfo.move_learn_method;
          if (['level-up'].includes(moveLearnMethod.name)) {
            if (Array.isArray(gameVersion)) {
              if (gameVersion.length > 0) {
                if (versionGroup.name === gameVersion[0].name) {
                  filtered.push({
                    skill: pokemon.moves[i].move,
                    info: versionDetailInfo,
                  });
                }
              }
            } else {
              if (versionGroup.name === gameVersion) {
                filtered.push({
                  skill: pokemon.moves[i].move,
                  info: versionDetailInfo,
                });

                break;
              }
            }
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
    openPopup();
    try {
      const response = await fetch(url);
      // pokemon = await response.json();
      console.log(await response.json());
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="pokemon-skills pb-5">
  <div class="title">Skill</div>
  {#if isLoadingSkillBox}
    <Icon class="animate-spin text-blue-600 block" data={faSpinner} scale="2" />
  {:else}
    <div class="flex flex-row">
      <div class="game-generation-tabs">
        <nav>
          {#each generations as value, index}
            <div class="generation-row">
            <span>
              <button
                      class={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                  index === generationIndex ? 'text-blue-500 font-medium border-blue-500' : ''
                }`}
                      on:click={(e) => createLevelMoves(index, value.originGameVersions)}
              >
                {value.name}
              </button>
            </span>
              <span>
              {#each value.gameVersions as game}
                <span class={`game-version-tag ${game}`}>{game}</span>
              {/each}
            </span>
            </div>
          {/each}
        </nav>
      </div>
      {#if skills.length > 0}
        <table class="skill-table-set table-auto">
          <thead>
          <tr>
            <th class="w-1/4">LV</th>
            <th class="w-3/4">Skill</th>
          </tr>
          </thead>
          <tbody>
          {#each skills as value}
            <tr class="skill-name" on:click={(e) => getSkillContent(value.skill.url)}>
              <td class="text-center">{value.info.level_learned_at < 10 ? `0${value.info.level_learned_at}` : value.info.level_learned_at}</td>
              <td class="pl-2">{value.skill.name}</td>
            </tr>
          {/each}
          </tbody>
        </table>
      {/if}
    </div>
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
      width: 800px;

      span {
        display: inline-block;
      }

      button {
        width: 180px;
      }

      .game-version-tag {
        border: 2.5px solid;
        border-radius: 5px;
        padding: 3px 5px;
        margin: 0 5px;

        &.red {
          border-color: #FF1111;
        }

        &.blue {
          border-color: #1111FF;
        }

        &.yellow {
          border-color: #FFD733;
        }

        &.gold {
          border-color: #DAA520;
        }

        &.silver {
          border-color: #C0C0C0;
        }

        &.crystal {
          border-color: #4FD9FF;
        }

        &.ruby {
          border-color: #A00000;
        }

        &.sapphire {
          border-color: #0000A0;
        }

        &.emerald {
          border-color: #00A000;
        }

        &.firered {
          border-color: #FF7327;
        }

        &.leafgreen {
          border-color: #00DD00;
        }

        &.colosseum {
          border-color: #B6CAE4;
        }

        &.xd {
          border-color: #604E82;
        }

        &.diamond {
          border-color: #AAAAFF;
        }

        &.pearl {
          border-color: #FFAAAA;
        }

        &.platinum {
          border-color: #999999;
        }

        &.heartgold {
          border-color: #B69E00;
        }

        &.soulsilver {
          border-color: #C0C0E1;
        }

        &.black {
          border-color: #444444;
        }

        &.white {
          border-color: #E1E1E1;
        }

        &.black2 {
          border-color: #424B50;
        }

        &.white2 {
          border-color: #E3CED0;
        }

        &.x {
          border-color: #025DA6;
        }

        &.y {
          border-color: #EA1A3E;
        }

        &.omegaruby {
          border-color: #AB2813;
        }

        &.alphasapphire {
          border-color: #26649C;
        }

        &.sun {
          border-color: #F1912B;
        }

        &.moon {
          border-color: #5599CA;
        }

        &.ultrasun {
          border-color: #E95B2B;
        }

        &.ultramoon {
          border-color: #226DB5;
        }

        &.letsgo {
          border-color: #D4924B;
        }

        &.sword {
          border-color: #004EA2;
        }

        &.shield {
          border-color: #B60007;
        }
      }
    }

    .skill-table-set {
      width: 250px;
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
